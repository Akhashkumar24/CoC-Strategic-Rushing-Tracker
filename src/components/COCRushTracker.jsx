import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Circle, TrendingUp, Upload, X } from 'lucide-react';

const COCRushTracker = () => {
  const [accountData, setAccountData] = useState(null);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [currentTH, setCurrentTH] = useState(null);

  const mapping = {
    1000014: "Clan Castle",
    1000031: "Eagle Artillery",
    1000071: "Hero Hall",
    1000024: "Dark Elixir Storage",
    1000006: "Barracks",
    1000003: "Elixir Storage",
    1000000: "Army Camp",
    1000007: "Laboratory",
    1000068: "Pet House",
    1000005: "Gold Storage",
    1000070: "Blacksmith",
    1000009: "Archer Tower",
    1000008: "Cannon",
    1000020: "Spell Factory",
    4000008: "Dragon",
    4000005: "Balloon",
    26000016: "Clone Spell",
    26000002: "Rage Spell"
  };

  // Custom max levels that override TH levels
  const customMaxLevels = {
    1000006: 9,   // Barracks max level 9
    1000070: 7,   // Blacksmith max level 7
    1000020: 5    // Spell Factory max level 5
  };

  // Buildings that should track ALL instances (not just top 4)
  const trackAllBuildings = [
    1000005,  // Gold Storage
    1000003,  // Elixir Storage
    1000024,  // Dark Elixir Storage
    1000000,  // Army Camp
    1000009,  // Archer Tower
    1000008   // Cannon
  ];

  const thLevels = {
    8: {
      buildings: {
        1000014: 4, 1000024: 4, 1000006: 10, 1000003: 11, 1000000: 6,
        1000007: 6, 1000005: 11, 1000009: 10, 1000008: 10, 1000020: 3,
        1000071: 2, 1000070: 1, 1000068: 0
      },
      lab: { 4000008: 3, 4000005: 5, 26000016: 0, 26000002: 5 }
    },
    9: {
      buildings: {
        1000014: 5, 1000024: 6, 1000006: 11, 1000003: 11, 1000000: 7,
        1000007: 7, 1000005: 11, 1000009: 11, 1000008: 11, 1000020: 4,
        1000071: 3, 1000070: 2, 1000068: 0
      },
      lab: { 4000008: 4, 4000005: 6, 26000016: 0, 26000002: 5 }
    },
    10: {
      buildings: {
        1000014: 6, 1000024: 6, 1000006: 12, 1000003: 11, 1000000: 8,
        1000007: 8, 1000005: 11, 1000009: 13, 1000008: 13, 1000020: 5,
        1000071: 4, 1000070: 3, 1000068: 0
      },
      lab: { 4000008: 5, 4000005: 6, 26000016: 3, 26000002: 5 }
    },
    11: {
      buildings: {
        1000014: 7, 1000024: 6, 1000006: 13, 1000003: 12, 1000000: 9,
        1000007: 9, 1000005: 12, 1000009: 15, 1000008: 15, 1000020: 6,
        1000031: 2, 1000071: 5, 1000070: 4, 1000068: 0
      },
      lab: { 4000008: 6, 4000005: 7, 26000016: 5, 26000002: 5 }
    },
    12: {
      buildings: {
        1000014: 8, 1000024: 7, 1000006: 14, 1000003: 13, 1000000: 10,
        1000007: 10, 1000005: 13, 1000009: 17, 1000008: 17, 1000020: 6,
        1000031: 3, 1000071: 6, 1000070: 5, 1000068: 0
      },
      lab: { 4000008: 7, 4000005: 8, 26000016: 5, 26000002: 6 }
    },
    13: {
      buildings: {
        1000014: 9, 1000024: 8, 1000006: 15, 1000003: 14, 1000000: 11,
        1000007: 11, 1000005: 14, 1000009: 19, 1000008: 19, 1000020: 7,
        1000031: 4, 1000071: 7, 1000070: 6, 1000068: 0
      },
      lab: { 4000008: 8, 4000005: 9, 26000016: 6, 26000002: 6 }
    },
    14: {
      buildings: {
        1000014: 10, 1000024: 9, 1000006: 16, 1000003: 15, 1000000: 11,
        1000007: 12, 1000005: 15, 1000009: 20, 1000008: 20, 1000020: 7,
        1000031: 5, 1000071: 8, 1000070: 7, 1000068: 4
      },
      lab: { 4000008: 9, 4000005: 10, 26000016: 7, 26000002: 6 }
    },
    15: {
      buildings: {
        1000014: 11, 1000024: 10, 1000006: 17, 1000003: 16, 1000000: 11,
        1000007: 13, 1000005: 16, 1000009: 21, 1000008: 21, 1000020: 8,
        1000031: 6, 1000071: 9, 1000070: 8, 1000068: 8
      },
      lab: { 4000008: 10, 4000005: 10, 26000016: 8, 26000002: 6 }
    },
    16: {
      buildings: {
        1000014: 12, 1000024: 11, 1000006: 18, 1000003: 17, 1000000: 12,
        1000007: 14, 1000005: 17, 1000009: 21, 1000008: 21, 1000020: 8,
        1000031: 7, 1000071: 10, 1000070: 9, 1000068: 10
      },
      lab: { 4000008: 11, 4000005: 11, 26000016: 8, 26000002: 6 }
    },
    17: {
      buildings: {
        1000014: 13, 1000024: 12, 1000006: 19, 1000003: 18, 1000000: 13,
        1000007: 15, 1000005: 18, 1000009: 21, 1000008: 21, 1000020: 9,
        1000031: 7, 1000071: 11, 1000070: 9, 1000068: 11
      },
      lab: { 4000008: 12, 4000005: 12, 26000016: 8, 26000002: 6 }
    },
    18: {
      buildings: {
        1000014: 14, 1000024: 13, 1000006: 19, 1000003: 19, 1000000: 13,
        1000007: 16, 1000005: 19, 1000009: 21, 1000008: 21, 1000020: 9,
        1000031: 7, 1000071: 12, 1000070: 9, 1000068: 11
      },
      lab: { 4000008: 12, 4000005: 12, 26000016: 8, 26000002: 6 }
    }
  };

  const handleJsonSubmit = () => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);
      
      if (!parsed.buildings || !Array.isArray(parsed.buildings)) {
        throw new Error('Invalid JSON format: missing buildings array');
      }

      const thBuilding = parsed.buildings.find(b => b.data === 1000001);
      if (!thBuilding) {
        throw new Error('Town Hall not found in data');
      }

      const thLevel = thBuilding.lvl;
      if (thLevel < 8 || thLevel > 18) {
        throw new Error(`Town Hall level ${thLevel} is not supported. Only TH8-TH18 are tracked.`);
      }

      setAccountData(parsed);
      setCurrentTH(thLevel);
      setJsonInput('');
    } catch (err) {
      setError(err.message || 'Invalid JSON format. Please check your input.');
    }
  };

  // Get all levels for buildings that need to track all instances
  const getAllBuildingLevels = (dataId) => {
    if (!accountData) return [];
    
    const items = (accountData.buildings || []).filter(item => item.data === dataId);
    if (items.length === 0) return [];
    
    // Expand each item based on its cnt field
    const allLevels = [];
    items.forEach(item => {
      const level = item.lvl || 0;
      const count = item.cnt || 1;
      
      for (let i = 0; i < count; i++) {
        allLevels.push(level);
      }
    });
    
    return allLevels.sort((a, b) => b - a);
  };

  // Get top 4 levels - for Archer Towers and Cannons
  const getTop4Levels = (dataId) => {
    const allLevels = getAllBuildingLevels(dataId);
    
    const top4 = [];
    for (let i = 0; i < 4; i++) {
      if (i < allLevels.length) {
        top4.push(allLevels[i]);
      } else {
        top4.push(0);
      }
    }
    
    return top4;
  };

  const getCurrentLevel = (dataId, isLab = false) => {
    if (!accountData) return 0;
    
    const source = isLab 
      ? (accountData.spells || []).concat(accountData.units || [])
      : accountData.buildings || [];
    
    const items = source.filter(item => item.data === dataId);
    
    if (items.length === 0) return 0;
    
    return Math.max(...items.map(item => item.lvl || 0));
  };

  const calculateProgress = () => {
    if (!accountData || !currentTH) return { total: 0, completed: 0, percentage: 0 };
    
    const targets = thLevels[currentTH];
    if (!targets) return { total: 0, completed: 0, percentage: 0 };

    let total = 0;
    let completed = 0;

    Object.entries(targets.buildings).forEach(([dataId, maxLevel]) => {
      const id = parseInt(dataId);
      if (maxLevel === 0) return;
      
      // Apply custom max level if it exists
      let targetLevel = maxLevel;
      if (customMaxLevels[id]) {
        targetLevel = Math.min(maxLevel, customMaxLevels[id]);
      }
      
      // Check if this building should track all instances
      if (trackAllBuildings.includes(id)) {
        const allLevels = getAllBuildingLevels(id);
        
        // Special handling for Archer Towers and Cannons (top 4 only, capped at 21)
        if (id === 1000009 || id === 1000008) {
          const top4 = getTop4Levels(id);
          const cappedTarget = Math.min(targetLevel, 21);
          total += 4;
          completed += top4.filter(l => l >= cappedTarget).length;
        } else {
          // Track ALL buildings for storages and army camps
          total += allLevels.length;
          completed += allLevels.filter(l => l >= targetLevel).length;
        }
      } else {
        // Single building tracking
        total += 1;
        const current = getCurrentLevel(id, false);
        if (current >= targetLevel) completed += 1;
      }
    });

    Object.entries(targets.lab).forEach(([dataId, maxLevel]) => {
      if (maxLevel === 0) return;
      total += 1;
      const current = getCurrentLevel(parseInt(dataId), true);
      if (current >= maxLevel) completed += 1;
    });

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  };

  const getItemStatus = (currentLevel, targetLevel, isMultiple = false) => {
    if (isMultiple) {
      return currentLevel.map(level => ({
        completed: level >= targetLevel,
        level,
        target: targetLevel
      }));
    }
    
    return {
      completed: currentLevel >= targetLevel,
      level: currentLevel,
      target: targetLevel
    };
  };

  const renderProgressBar = (completed, total) => {
    const percentage = total > 0 ? (completed / total) * 100 : 0;
    return (
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  const progress = calculateProgress();
  const targets = currentTH ? thLevels[currentTH] : null;

  if (!accountData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <TrendingUp className="text-yellow-400" size={40} />
              CoC Strategic Rushing Tracker
            </h1>
            <p className="text-gray-300 text-lg">Track your progress from TH8 to TH18</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Paste Your Account JSON</h2>
            </div>
            
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='Paste your account JSON here (e.g., {"tag":"#ABC123", "buildings":[...], ...})'
              className="w-full h-64 bg-slate-700 text-white p-4 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && (
              <div className="mt-4 bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg flex items-start gap-2">
                <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleJsonSubmit}
              disabled={!jsonInput.trim()}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Load Account Data
            </button>

            <div className="mt-8 bg-slate-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">📋 Requirements:</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Account must be TH8 or higher</li>
                <li>• JSON must contain "buildings", "units", and "spells" arrays</li>
                <li>• Town Hall data ID must be present (1000001)</li>
              </ul>
              
              <h3 className="text-xl font-bold text-white mb-4 mt-6">🎯 What's Tracked:</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Single Buildings:</strong> Clan Castle, Laboratory, Pet House, Hero Hall, Eagle Artillery</li>
                <li>• <strong>ALL Instances:</strong> Gold Storage, Elixir Storage, Dark Elixir Storage, Army Camps</li>
                <li>• <strong>Top 4 Defenses:</strong> Archer Towers and Cannons (capped at level 21)</li>
                <li>• <strong>Capped Buildings:</strong> Barracks (max 9), Blacksmith (max 7), Spell Factory (max 5)</li>
                <li>• <strong>Lab:</strong> Dragon, Balloon, Clone Spell, Rage Spell</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <TrendingUp className="text-yellow-400" size={40} />
            CoC Strategic Rushing Tracker
          </h1>
          <p className="text-gray-300 text-lg">Account: {accountData.tag || 'Unknown'}</p>
          <div className="mt-2 flex items-center justify-center gap-4">
            <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-200 px-6 py-2 rounded-lg font-bold text-xl">
              Town Hall {currentTH}
            </div>
            <button
              onClick={() => {
                setAccountData(null);
                setCurrentTH(null);
                setJsonInput('');
              }}
              className="text-red-400 hover:text-red-300 flex items-center gap-2"
            >
              <X size={16} />
              Load Different Account
            </button>
          </div>
        </div>

        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-white">
              Overall Progress
            </h2>
            <div className="text-right">
              <div className="text-4xl font-bold text-yellow-400">
                {progress.percentage}%
              </div>
              <div className="text-sm text-gray-300">
                {progress.completed} / {progress.total} Complete
              </div>
            </div>
          </div>
          {renderProgressBar(progress.completed, progress.total)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-blue-400" />
              Buildings
            </h3>
            <div className="space-y-3">
              {targets && Object.entries(targets.buildings).map(([dataId, targetLevel]) => {
                const id = parseInt(dataId);
                const name = mapping[id];
                if (targetLevel === 0) return null;

                // Apply custom max level if it exists
                let actualTarget = targetLevel;
                if (customMaxLevels[id]) {
                  actualTarget = Math.min(targetLevel, customMaxLevels[id]);
                }

                // Check if we should track all instances of this building
                const shouldTrackAll = trackAllBuildings.includes(id);
                
                if (shouldTrackAll) {
                  const allLevels = getAllBuildingLevels(id);
                  
                  // Special case: Archer Towers and Cannons - show top 4 only, capped at 21
                  if (id === 1000009 || id === 1000008) {
                    const top4Levels = getTop4Levels(id);
                    const cappedTarget = Math.min(actualTarget, 21);
                    const status = getItemStatus(top4Levels, cappedTarget, true);
                    
                    return (
                      <div key={id} className="bg-slate-700/50 p-4 rounded-lg">
                        <div className="font-semibold text-white mb-2">{name} (Top 4)</div>
                        <div className="grid grid-cols-4 gap-2">
                          {status.map((s, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded text-center ${
                                s.completed
                                  ? 'bg-green-600 text-white'
                                  : 'bg-red-600/70 text-white'
                              }`}
                            >
                              <div className="text-xs mb-1">#{idx + 1}</div>
                              <div className="font-bold">{s.level}/{s.target}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
                  // For other multi-instance buildings (storages, army camps) - show ALL
                  const status = getItemStatus(allLevels, actualTarget, true);
                  const completedCount = allLevels.filter(l => l >= actualTarget).length;
                  
                  return (
                    <div key={id} className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-white">
                          {name} ({allLevels.length} total)
                        </div>
                        <div className={`font-bold ${completedCount === allLevels.length ? 'text-green-400' : 'text-yellow-400'}`}>
                          {completedCount}/{allLevels.length} at {actualTarget}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {status.map((s, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded text-center text-sm ${
                              s.completed
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600/70 text-white'
                            }`}
                          >
                            <div className="text-xs mb-1">#{idx + 1}</div>
                            <div className="font-bold">{s.level}/{s.target}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Single building tracking
                const currentLevel = getCurrentLevel(id, false);
                const status = getItemStatus(currentLevel, actualTarget);
                const hasCustomCap = customMaxLevels[id] && customMaxLevels[id] < targetLevel;

                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      status.completed
                        ? 'bg-green-600/20 border border-green-500/50'
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {status.completed ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                      <span className="text-white font-medium">
                        {name}
                        {hasCustomCap && <span className="text-xs text-yellow-400 ml-2">(capped)</span>}
                      </span>
                    </div>
                    <div className={`font-bold ${status.completed ? 'text-green-400' : 'text-yellow-400'}`}>
                      {status.level} / {status.target}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="text-purple-400" />
              Laboratory
            </h3>
            <div className="space-y-3">
              {targets && Object.entries(targets.lab).map(([dataId, targetLevel]) => {
                const id = parseInt(dataId);
                const name = mapping[id];
                if (targetLevel === 0) return null;

                const currentLevel = getCurrentLevel(id, true);
                const status = getItemStatus(currentLevel, targetLevel);

                return (
                  <div
                    key={id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      status.completed
                        ? 'bg-green-600/20 border border-green-500/50'
                        : 'bg-slate-700/50 border border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {status.completed ? (
                        <CheckCircle className="text-green-400" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                      <span className="text-white font-medium">{name}</span>
                    </div>
                    <div className={`font-bold ${status.completed ? 'text-green-400' : 'text-yellow-400'}`}>
                      {status.level} / {status.target}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Strategic Rushing Notes</h3>
          <ul className="text-gray-300 space-y-2 list-disc list-inside">
            <li>Focus on offensive capabilities: Army Camps, Barracks, Laboratory</li>
            <li>Prioritize farming efficiency: All Storages and Clan Castle</li>
            <li>Tracking ALL instances of Storages and Army Camps</li>
            <li>Top 4 highest Archer Towers and Cannons only (capped at level 21)</li>
            <li>Lab priorities: Dragons, Balloons, Clone Spell, Rage Spell</li>
            <li>Barracks capped at level 9, Blacksmith at 7, Spell Factory at 5</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default COCRushTracker;
