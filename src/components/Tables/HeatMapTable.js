import React, { useState, useEffect } from 'react';
import api from './../../utils/services/api';
import PropTypes from 'prop-types';

// Import the user identity constant from environment variables
const HEATMAP_USER_IDENTITY =
  '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';
///

const HeatMapTable = () => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [metricRanges, setMetricRanges] = useState({}); // Stores min/max for each metric

  const heatmapMetrics = [
    { label: 'CPC', value: 'CPC' },
    { label: 'CR %', value: 'CR_perc' },
    { label: 'ROAS', value: 'ROAS' },
  ];

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const hoursOfDay = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, '0')}:00`,
  );

  useEffect(() => {
    const fetchHeatmapData = async () => {
      setLoading(true);
      setError(null);
      setHeatmapData([]);
      setApiResponse(null);

      const metricsToSend = heatmapMetrics.map((metric) => metric.value);

      try {
        const response = await api.post(
          '/day-parting/heatmap-list',
          {
            startDate: '2024-06-08',
            endDate: '2024-07-07',
            metrics: metricsToSend,
          },
          {
            headers: {
              'X-USER-IDENTITY': HEATMAP_USER_IDENTITY,
            },
          },
        );

        setApiResponse(response.data);

        if (response.data && Array.isArray(response.data.result)) {
          const sortedData = [...response.data.result].sort(
            (a, b) => a.weekNumber - b.weekNumber,
          );
          setHeatmapData(sortedData);
        } else {
          setHeatmapData([]);
          setError(
            response.data.message ||
              'API returned an unexpected data format or no "result" array for heatmap.',
          );
        }
      } catch (err) {
        if (err.response) {
          setError(
            err.response.data.message ||
              'Failed to fetch heatmap data from the server.',
          );
          console.error(
            'HeatMapTable - API Error Response:',
            err.response.data,
          );
        } else if (err.request) {
          setError('Network error: No response received for heatmap data.');
          console.error('HeatMapTable - Network Request Error:', err.request);
        } else {
          setError(
            'HeatMapTable - An unexpected error occurred while setting up the request.',
          );
          console.error('HeatMapTable - Request Setup Error:', err.message);
        }
        setHeatmapData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
  }, [HEATMAP_USER_IDENTITY]);

  // Effect to calculate min/max values for each metric across all hourly and total data
  useEffect(() => {
    const newMetricRanges = {};

    heatmapMetrics.forEach((metric) => {
      let currentMin = Infinity;
      let currentMax = -Infinity;

      heatmapData.forEach((day) => {
        // Check hourly data
        day.Hourly_Data.forEach((hour) => {
          const value = hour[metric.value];
          if (typeof value === 'number' && !isNaN(value)) {
            currentMin = Math.min(currentMin, value);
            currentMax = Math.max(currentMax, value);
          }
        });
        // Check total data for the day
        const totalValue = day[`Total_${metric.value}`];
        if (typeof totalValue === 'number' && !isNaN(totalValue)) {
          currentMin = Math.min(currentMin, totalValue);
          currentMax = Math.max(currentMax, totalValue);
        }
      });

      newMetricRanges[metric.value] = {
        min: currentMin === Infinity ? 0 : currentMin,
        max: currentMax === -Infinity ? 0 : currentMax,
      };
    });
    setMetricRanges(newMetricRanges);
  }, [heatmapData]);

  const getCellColor = (value, metricValue) => {
    const range = metricRanges[metricValue];
    if (
      !range ||
      value === null ||
      !Number.isFinite(value) ||
      range.min === range.max
    ) {
      return 'bg-gray-200';
    }

    const normalizedValue = (value - range.min) / (range.max - range.min);

    let r, g, b;
    // For ROAS and CR_perc, higher is better (more green, less red)
    if (metricValue === 'ROAS' || metricValue === 'CR_perc') {
      r = Math.round(255 * (1 - normalizedValue));
      g = Math.round(255 * normalizedValue);
      b = 0;
    } else {
      // For CPC, lower is better (more green, less red)
      r = Math.round(255 * normalizedValue);
      g = Math.round(255 * (1 - normalizedValue));
      b = 0;
    }
    return `bg-[rgb(${r},${g},${b})]`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 my-6 w-full overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-green-500 pb-2">
        Daily/Hourly Heatmap
      </h2>

      {loading && (
        <div className="flex items-center justify-center h-80 flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          <p className="ml-4 text-lg text-gray-600 mt-4">
            Loading heatmap data...
          </p>
        </div>
      )}

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <button
            type="button"
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.303l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 10l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 8.697l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" />
            </svg>
          </button>
        </div>
      )}

      {!loading && !error && heatmapData.length > 0 ? (
        <div className="overflow-x-auto">
          {/* Removed the dropdown as per your request */}
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                {/* Top-left corner cell, spans 2 rows */}
                <th
                  rowSpan="2"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-r border-gray-200"
                >
                  Time
                </th>
                {/* Day headers with colspan for each metric */}
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    colSpan={heatmapMetrics.length}
                    className="px-2 py-2 text-center text-xs font-medium text-gray-600 uppercase tracking-wider border-l border-gray-200"
                  >
                    {day.substring(0, 3)}
                  </th>
                ))}
              </tr>
              <tr>
                {/* Metric headers for each day */}
                {daysOfWeek.map((day) => (
                  <React.Fragment key={`${day}-metrics`}>
                    {heatmapMetrics.map((metric) => (
                      <th
                        key={`${day}-${metric.value}`}
                        className="px-1 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-l border-r border-gray-200"
                      >
                        {metric.label.replace('_perc', '%')}
                      </th>
                    ))}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hoursOfDay.map((hour) => (
                <tr key={hour}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200 sticky left-0 bg-white z-10">
                    {hour}
                  </td>
                  {daysOfWeek.map((day) => {
                    const dayData = heatmapData.find((d) => d.weekday === day);
                    const hourlyMetricData = dayData
                      ? dayData.Hourly_Data.find((h) => h.time_part === hour)
                      : null;
                    return (
                      <React.Fragment key={`${day}-${hour}-data`}>
                        {heatmapMetrics.map((metric) => {
                          const value = hourlyMetricData
                            ? hourlyMetricData[metric.value]
                            : null;
                          return (
                            <td
                              key={`${day}-${hour}-${metric.value}`}
                              className={`px-1 py-1 whitespace-nowrap text-xs text-center border-l border-r border-gray-200 ${value !== null ? getCellColor(value, metric.value) : 'bg-gray-100 text-gray-500'}`}
                              title={
                                value !== null
                                  ? `${metric.label}: ${value.toFixed(2)}`
                                  : 'N/A'
                              }
                            >
                              {value !== null ? value.toFixed(2) : 'N/A'}
                            </td>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-gray-100 border-t-2 border-gray-300 font-bold">
                <th className="px-3 py-2 text-left text-sm text-gray-800 uppercase tracking-wider border-r border-gray-300">
                  Total
                </th>
                {daysOfWeek.map((day) => {
                  const dayData = heatmapData.find((d) => d.weekday === day);
                  return (
                    <React.Fragment key={`${day}-totals`}>
                      {heatmapMetrics.map((metric) => {
                        const totalValue = dayData
                          ? dayData[`Total_${metric.value}`]
                          : null;
                        return (
                          <td
                            key={`${day}-total-${metric.value}`}
                            className={`px-1 py-1 whitespace-nowrap text-xs text-center border-l border-r border-gray-200 ${totalValue !== null ? getCellColor(totalValue, metric.value) : 'bg-gray-300 text-gray-600'}`}
                            title={
                              totalValue !== null
                                ? `Total ${metric.label}: ${totalValue.toFixed(2)}`
                                : 'N/A'
                            }
                          >
                            {totalValue !== null
                              ? totalValue.toFixed(2)
                              : 'N/A'}
                          </td>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tr>
            </tbody>
          </table>
          <p className="text-right text-gray-600 text-sm mt-2">
            Colors indicate relative performance: Green = Better (Lower CPC,
            Higher CR%/ROAS); Red = Worse.
          </p>
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-600 col-span-full text-center py-8">
            {apiResponse && apiResponse.message
              ? `Server message: "${apiResponse.message}"`
              : 'No heatmap data available for the selected period.'}
          </p>
        )
      )}
    </div>
  );
};

HeatMapTable.propTypes = {};

export default HeatMapTable;
