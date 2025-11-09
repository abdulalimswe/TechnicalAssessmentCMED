import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { drugInteractionService } from '../services/drugInteractionService';

const DrugInteraction = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDrugInteraction();
  }, []);

  const fetchDrugInteraction = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await drugInteractionService.getDrugInteraction();
      setData(response);
    } catch (err) {
      console.error('Error fetching drug interaction:', err);
      setError('Failed to fetch drug interaction data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderInteractionGroups = () => {
    if (!data || !data.interactionTypeGroup) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No interaction data available</p>
        </div>
      );
    }

    return data.interactionTypeGroup.map((group, groupIndex) => (
      <div key={groupIndex} className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {group.sourceDisclaimer || 'Drug Interactions'}
        </h3>
        {group.interactionType && group.interactionType.map((type, typeIndex) => (
          <div key={typeIndex} className="mb-4">
            {type.comment && (
              <p className="text-sm text-gray-600 mb-2 italic">{type.comment}</p>
            )}
            {type.interactionPair && type.interactionPair.map((pair, pairIndex) => (
              <div key={pairIndex} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-800">
                      <strong>Severity:</strong> {pair.severity || 'N/A'}
                    </p>


                    {pair.description && (
                      <p className="text-sm text-yellow-700 mt-2">{pair.description}</p>
                    )}
                    {pair.interactionConcept && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-yellow-900">Involved Drugs:</p>
                        {pair.interactionConcept.map((concept, conceptIndex) => (
                          <span key={conceptIndex} className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mr-2 mt-1">
                            {concept.minConceptItem?.name || concept.sourceConceptItem?.name || 'Unknown'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Drug Interaction Information</h1>
          <button
            onClick={fetchDrugInteraction}
            className="btn-secondary flex items-center"
          >
            <span className="mr-2">🔄</span>
            Refresh
          </button>
        </div>

        {/* Info Card */}
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">External API Integration</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>This data is fetched from the <strong>RxNav Drug Interaction API</strong> provided by the National Library of Medicine.</p>
                <p className="mt-1">RxCUI: 341248 (example drug)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="card bg-red-50 border-l-4 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Drug Interaction Data */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Interaction Details</h2>

          {!data ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">💊</div>
              <p className="text-lg font-medium">No data loaded</p>
              <p className="text-sm mt-2">Click refresh to load drug interaction data</p>
            </div>
          ) : (
            <div>
              {/* Display Raw JSON for demonstration */}
              <div className="mb-6">
                <details className="bg-gray-50 p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
                    📄 View Raw JSON Response
                  </summary>
                  <pre className="mt-4 text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </details>
              </div>

              {/* Render Interaction Groups */}
              <div className="mt-6">
                {renderInteractionGroups()}
              </div>

              {/* Display in Table Format */}
              {data && data.interactionTypeGroup && data.interactionTypeGroup.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Table</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Drug 1
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Drug 2
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Severity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {data.interactionTypeGroup.flatMap((group) =>
                          group.interactionType?.flatMap((type) =>
                            type.interactionPair?.map((pair, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {pair.interactionConcept?.[0]?.minConceptItem?.name ||
                                   pair.interactionConcept?.[0]?.sourceConceptItem?.name ||
                                   'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {pair.interactionConcept?.[1]?.minConceptItem?.name ||
                                   pair.interactionConcept?.[1]?.sourceConceptItem?.name ||
                                   'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    pair.severity === 'high' ? 'bg-red-100 text-red-800' :
                                    pair.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {pair.severity || 'N/A'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                                  {pair.description || 'No description available'}
                                </td>
                              </tr>
                            )) || []
                          ) || []
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Additional Information */}
        <div className="card bg-gray-50">
          <h3 className="text-md font-semibold text-gray-900 mb-2">ℹ️ About This Feature</h3>
          <p className="text-sm text-gray-600">
            This page demonstrates the consumption of an external REST API. The drug interaction data is fetched
            from the RxNav API and displayed in both structured and tabular formats. This helps healthcare
            professionals identify potential drug interactions before prescribing medications.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DrugInteraction;