import { useState } from 'react'
import { 
  LightBulbIcon, 
  RocketLaunchIcon, 
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline'

function App() {
  const [currentPhase, setCurrentPhase] = useState('capture') // 'capture' or 'execute'
  const [sparks, setSparks] = useState([])
  const [actions, setActions] = useState([])
  const [newSpark, setNewSpark] = useState('')
  const [newAction, setNewAction] = useState('')
  const [selectedSpark, setSelectedSpark] = useState(null)

  const addSpark = () => {
    if (newSpark.trim()) {
      const spark = {
        id: Date.now(),
        text: newSpark.trim(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      setSparks([...sparks, spark])
      setNewSpark('')
    }
  }

  const addAction = () => {
    if (newAction.trim() && selectedSpark) {
      const action = {
        id: Date.now(),
        text: newAction.trim(),
        sparkId: selectedSpark.id,
        timestamp: new Date().toISOString(),
        status: 'pending'
      }
      setActions([...actions, action])
      setNewAction('')
    }
  }

  const completeAction = (actionId) => {
    setActions(actions.map(action => 
      action.id === actionId 
        ? { ...action, status: 'completed' }
        : action
    ))
  }

  const getActionsForSpark = (sparkId) => {
    return actions.filter(action => action.sparkId === sparkId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FireIcon className="h-12 w-12 text-orange-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Spark-to-Action</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your ideas into reality with our simple two-phase model: 
            <span className="font-semibold text-primary-600"> Capture</span> your sparks, then 
            <span className="font-semibold text-success-600"> Execute</span> your actions.
          </p>
        </div>

        {/* Phase Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setCurrentPhase('capture')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentPhase === 'capture'
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LightBulbIcon className="h-5 w-5 inline mr-2" />
              Capture
            </button>
            <button
              onClick={() => setCurrentPhase('execute')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                currentPhase === 'execute'
                  ? 'bg-success-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <RocketLaunchIcon className="h-5 w-5 inline mr-2" />
              Execute
            </button>
          </div>
        </div>

        {/* Capture Phase */}
        {currentPhase === 'capture' && (
          <div className="max-w-4xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <LightBulbIcon className="h-6 w-6 text-orange-500 mr-2" />
                Capture Your Sparks
              </h2>
              <p className="text-gray-600 mb-6">
                Write down any ideas, thoughts, or inspirations that come to mind. 
                Don't filter - just capture everything!
              </p>
              
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={newSpark}
                  onChange={(e) => setNewSpark(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSpark()}
                  placeholder="What's your latest spark of inspiration?"
                  className="input-field flex-1"
                />
                <button onClick={addSpark} className="btn-primary">
                  <PlusIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Sparks List */}
            <div className="grid gap-4">
              {sparks.map((spark) => (
                <div key={spark.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{spark.text}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(spark.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        {getActionsForSpark(spark.id).length} actions
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {sparks.length === 0 && (
                <div className="card text-center text-gray-500">
                  <LightBulbIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No sparks captured yet. Start by adding your first idea!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Execute Phase */}
        {currentPhase === 'execute' && (
          <div className="max-w-4xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <RocketLaunchIcon className="h-6 w-6 text-success-500 mr-2" />
                Execute Your Actions
              </h2>
              <p className="text-gray-600 mb-6">
                Select a spark and create actionable steps to bring it to life.
              </p>

              {/* Spark Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select a Spark:
                </label>
                <select
                  value={selectedSpark?.id || ''}
                  onChange={(e) => {
                    const spark = sparks.find(s => s.id === parseInt(e.target.value))
                    setSelectedSpark(spark)
                  }}
                  className="input-field"
                >
                  <option value="">Choose a spark to work on...</option>
                  {sparks.map((spark) => (
                    <option key={spark.id} value={spark.id}>
                      {spark.text}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add Action */}
              {selectedSpark && (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAction()}
                    placeholder="What's the next action step?"
                    className="input-field flex-1"
                  />
                  <button onClick={addAction} className="btn-primary">
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Actions List */}
            {selectedSpark && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Actions for: "{selectedSpark.text}"
                </h3>
                
                {getActionsForSpark(selectedSpark.id).map((action) => (
                  <div key={action.id} className="card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => completeAction(action.id)}
                          className={`p-1 rounded-full transition-colors ${
                            action.status === 'completed'
                              ? 'text-success-600'
                              : 'text-gray-400 hover:text-success-600'
                          }`}
                        >
                          {action.status === 'completed' ? (
                            <CheckCircleIcon className="h-6 w-6" />
                          ) : (
                            <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />
                          )}
                        </button>
                        <span className={`font-medium ${
                          action.status === 'completed' 
                            ? 'text-gray-500 line-through' 
                            : 'text-gray-900'
                        }`}>
                          {action.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {action.status === 'pending' && (
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                        )}
                        {action.status === 'completed' && (
                          <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded-full">
                            Done
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {getActionsForSpark(selectedSpark.id).length === 0 && (
                  <div className="card text-center text-gray-500">
                    <RocketLaunchIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No actions yet. Start by adding your first action step!</p>
                  </div>
                )}
              </div>
            )}

            {!selectedSpark && (
              <div className="card text-center text-gray-500">
                <RocketLaunchIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a spark above to start creating action steps.</p>
              </div>
            )}
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-white rounded-lg px-6 py-4 shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{sparks.length}</div>
              <div className="text-sm text-gray-600">Sparks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-600">
                {actions.filter(a => a.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {actions.filter(a => a.status === 'pending').length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
