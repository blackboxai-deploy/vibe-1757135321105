'use client';

import { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: "Server Production Down Berkepanjangan",
    description: "Server utama aplikasi e-commerce mengalami downtime selama 4 jam, menyebabkan kerugian finansial dan reputasi yang signifikan.",
    severity: "High",
    industry: "IT/Technology",
    impact: "Revenue loss $50K, customer complaints increased 300%",
    complexity: "High - Multiple systems involved",
    problemStatement: "Server produksi utama mengalami kegagalan total pada jam sibuk (20:00 WIB), mempengaruhi 10,000+ pengguna aktif dan menyebabkan loss transaksi senilai $50,000.",
    timeline: [
      { time: "20:00", event: "Server mulai tidak responsif" },
      { time: "20:15", event: "Alert monitoring system triggered" },
      { time: "20:30", event: "Team DevOps mulai investigasi" },
      { time: "21:00", event: "Identifikasi masalah database connection" },
      { time: "22:30", event: "Failover ke backup server" },
      { time: "24:00", event: "Service fully restored" }
    ]
  },
  {
    id: 2,
    title: "Kualitas Produk Manufaktur Menurun",
    description: "Tingkat defect produk elektronik meningkat 40% dalam 2 minggu terakhir, menyebabkan peningkatan return dan keluhan customer.",
    severity: "High",
    industry: "Manufacturing",
    impact: "Defect rate increased to 8.5%, return cost +$200K",
    complexity: "Medium - Process and quality control"
  },
  {
    id: 3,
    title: "Tingkat Absensi Karyawan Meningkat",
    description: "Absensi karyawan divisi customer service meningkat 60% dalam 3 bulan, mempengaruhi kualitas layanan dan kepuasan pelanggan.",
    severity: "Medium",
    industry: "Human Resources",
    impact: "Service quality down 25%, overtime costs +$30K",
    complexity: "Medium - People and process factors"
  }
];

export default function RCAStrategy() {
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [activeTab, setActiveTab] = useState('scenario');
  const [analysisData, setAnalysisData] = useState({
    fishbone: {},
    fiveWhys: [],
    actionPlan: []
  });

  const resetAnalysis = () => {
    setSelectedScenario(null);
    setActiveTab('scenario');
    setAnalysisData({ fishbone: {}, fiveWhys: [], actionPlan: [] });
  };

  const getBadgeClass = (severity) => {
    switch(severity) {
      case 'High': return 'badge badge-high';
      case 'Medium': return 'badge badge-medium';
      case 'Low': return 'badge badge-low';
      default: return 'badge badge-outline';
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{color: 'white'}}>
          Root Cause Analysis Strategy Platform
        </h1>
        <p className="text-xl" style={{color: '#f1f5f9', maxWidth: '800px', margin: '0 auto'}}>
          Platform komprehensif untuk menganalisis akar masalah menggunakan metodologi terstruktur
        </p>
      </div>

      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6" style={{color: 'white'}}>
            Pilih Skenario Root Cause Analysis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <div 
                key={scenario.id} 
                className="card cursor-pointer"
                onClick={() => setSelectedScenario(scenario)}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={getBadgeClass(scenario.severity)}>
                    {scenario.severity} Priority
                  </span>
                  <span className="badge badge-outline">{scenario.industry}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-semibold" style={{color: '#dc2626'}}>Dampak:</span> {scenario.impact}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold" style={{color: '#2563eb'}}>Kompleksitas:</span> {scenario.complexity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Interface */}
      {selectedScenario && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold" style={{color: 'white'}}>
              Analisis RCA: {selectedScenario.title}
            </h2>
            <button onClick={resetAnalysis} className="btn btn-outline">
              Pilih Skenario Lain
            </button>
          </div>

          <div className="tab-container">
            <div className="tab-list">
              <button 
                className={`tab ${activeTab === 'scenario' ? 'active' : ''}`}
                onClick={() => setActiveTab('scenario')}
              >
                Skenario
              </button>
              <button 
                className={`tab ${activeTab === 'fishbone' ? 'active' : ''}`}
                onClick={() => setActiveTab('fishbone')}
              >
                Fishbone
              </button>
              <button 
                className={`tab ${activeTab === 'fivewhys' ? 'active' : ''}`}
                onClick={() => setActiveTab('fivewhys')}
              >
                5 Whys
              </button>
              <button 
                className={`tab ${activeTab === 'action' ? 'active' : ''}`}
                onClick={() => setActiveTab('action')}
              >
                Action Plan
              </button>
              <button 
                className={`tab ${activeTab === 'summary' ? 'active' : ''}`}
                onClick={() => setActiveTab('summary')}
              >
                Ringkasan
              </button>
            </div>

            {/* Scenario Tab */}
            <div className={`tab-content ${activeTab === 'scenario' ? 'active' : ''}`}>
              <ScenarioAnalysis scenario={selectedScenario} />
            </div>

            {/* Fishbone Tab */}
            <div className={`tab-content ${activeTab === 'fishbone' ? 'active' : ''}`}>
              <FishboneAnalysis 
                scenario={selectedScenario} 
                onComplete={(data) => setAnalysisData(prev => ({...prev, fishbone: data}))}
              />
            </div>

            {/* Five Whys Tab */}
            <div className={`tab-content ${activeTab === 'fivewhys' ? 'active' : ''}`}>
              <FiveWhysAnalysis 
                scenario={selectedScenario}
                onComplete={(data) => setAnalysisData(prev => ({...prev, fiveWhys: data}))}
              />
            </div>

            {/* Action Plan Tab */}
            <div className={`tab-content ${activeTab === 'action' ? 'active' : ''}`}>
              <ActionPlanComponent 
                scenario={selectedScenario}
                analysisData={analysisData}
                onComplete={(data) => setAnalysisData(prev => ({...prev, actionPlan: data}))}
              />
            </div>

            {/* Summary Tab */}
            <div className={`tab-content ${activeTab === 'summary' ? 'active' : ''}`}>
              <SummaryAnalysis 
                scenario={selectedScenario}
                analysisData={analysisData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Scenario Analysis Component
function ScenarioAnalysis({ scenario }) {
  return (
    <div className="space-y-6">
      <div className="alert alert-info">
        <strong>Problem Statement:</strong> {scenario.problemStatement}
      </div>
      
      <div className="grid md:grid-cols-2">
        <div className="card" style={{background: '#fef2f2'}}>
          <h4 className="font-semibold mb-2" style={{color: '#dc2626'}}>Business Impact</h4>
          <p className="text-sm">{scenario.impact}</p>
        </div>
        <div className="card" style={{background: '#eff6ff'}}>
          <h4 className="font-semibold mb-2" style={{color: '#2563eb'}}>Complexity Level</h4>
          <p className="text-sm">{scenario.complexity}</p>
        </div>
      </div>

      {scenario.timeline && (
        <div className="card">
          <h4 className="font-semibold mb-4">Timeline Kejadian</h4>
          <div className="space-y-4">
            {scenario.timeline.map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div style={{
                  width: '12px',
                  height: '12px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  marginTop: '6px',
                  flexShrink: 0
                }}></div>
                <div>
                  <span className="badge badge-outline">{event.time}</span>
                  <p className="text-sm mt-1">{event.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card" style={{background: '#f0fdf4'}}>
        <h4 className="font-semibold mb-2" style={{color: '#166534'}}>Rekomendasi Metodologi RCA</h4>
        <div className="grid md:grid-cols-2">
          <div className="p-4" style={{background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', margin: '0.25rem'}}>
            <h5 className="font-semibold">Primary: Fishbone Diagram</h5>
            <p className="text-sm">Sistematis untuk masalah kompleks dengan banyak faktor</p>
          </div>
          <div className="p-4" style={{background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', margin: '0.25rem'}}>
            <h5 className="font-semibold">Secondary: 5 Whys</h5>
            <p className="text-sm">Menggali deeper pada penyebab utama</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fishbone Analysis Component
function FishboneAnalysis({ scenario, onComplete }) {
  const [selectedCauses, setSelectedCauses] = useState({});
  const [step, setStep] = useState('overview');

  const categories = {
    "People": { icon: "👥", class: "fishbone-people" },
    "Process": { icon: "🔄", class: "fishbone-process" },
    "Environment": { icon: "🏢", class: "fishbone-environment" },
    "Equipment": { icon: "⚙️", class: "fishbone-equipment" },
    "Materials": { icon: "📦", class: "fishbone-materials" },
    "Methods": { icon: "📋", class: "fishbone-methods" }
  };

  const sampleCauses = {
    "People": ["Skill gap", "Training inadequate", "Communication issues", "Workload excess"],
    "Process": ["Procedure unclear", "No proper documentation", "Workflow inefficient", "Standards not followed"],
    "Environment": ["External factors", "Workplace conditions", "Regulatory changes", "Market conditions"],
    "Equipment": ["Hardware failure", "Software bugs", "Insufficient capacity", "Maintenance issues"],
    "Materials": ["Quality issues", "Supply problems", "Specification changes", "Vendor problems"],
    "Methods": ["Methodology flaws", "Approach inadequate", "Best practices not followed", "Techniques outdated"]
  };

  const toggleCause = (category, cause) => {
    setSelectedCauses(prev => ({
      ...prev,
      [category]: prev[category] ? 
        (prev[category].includes(cause) ? 
          prev[category].filter(c => c !== cause) : 
          [...prev[category], cause]
        ) : [cause]
    }));
  };

  const getTotalSelected = () => {
    return Object.values(selectedCauses).flat().length;
  };

  const completeAnalysis = () => {
    onComplete(selectedCauses);
    setStep('completed');
  };

  if (step === 'overview') {
    return (
      <div className="space-y-6">
        <div className="alert alert-info">
          <strong>Fishbone Analysis (Ishikawa Diagram)</strong><br/>
          Mengidentifikasi dan kategorikan semua kemungkinan penyebab masalah menggunakan 6 kategori utama (6M).
        </div>
        
        <div className="grid md:grid-cols-3">
          {Object.entries(categories).map(([category, details]) => (
            <div key={category} className={`fishbone-category ${details.class}`}>
              <div className="flex items-center space-x-2 mb-2">
                <span style={{fontSize: '1.5rem'}}>{details.icon}</span>
                <h4 className="font-semibold">{category}</h4>
              </div>
              <p className="text-sm">Faktor-faktor yang berkaitan dengan {category.toLowerCase()}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button onClick={() => setStep('selection')} className="btn">
            Mulai Fishbone Analysis
          </button>
        </div>
      </div>
    );
  }

  if (step === 'selection') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Fishbone Analysis - Cause Selection</h3>
            <p className="text-sm" style={{color: '#6b7280'}}>
              Selected: {getTotalSelected()} causes | Target: 12-20 untuk analisis komprehensif
            </p>
          </div>
          <div className="space-x-2">
            <button onClick={() => setStep('overview')} className="btn btn-outline">Kembali</button>
            <button 
              onClick={completeAnalysis}
              disabled={getTotalSelected() < 6}
              className="btn"
            >
              Complete Analysis
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {Object.entries(categories).map(([category, details]) => (
            <div key={category} className={`fishbone-category ${details.class}`}>
              <div className="flex items-center space-x-2 mb-4">
                <span style={{fontSize: '1.5rem'}}>{details.icon}</span>
                <h4 className="font-semibold">{category}</h4>
                <span className="badge badge-outline">
                  {selectedCauses[category]?.length || 0}
                </span>
              </div>
              
              <div className="space-y-2">
                {sampleCauses[category].map((cause, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedCauses[category]?.includes(cause) || false}
                      onChange={() => toggleCause(category, cause)}
                    />
                    <label className="text-sm cursor-pointer" onClick={() => toggleCause(category, cause)}>
                      {cause}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'completed') {
    return (
      <div className="space-y-6">
        <div className="alert alert-success">
          <strong>Fishbone Analysis Completed!</strong><br/>
          Total {getTotalSelected()} potential causes identified across 6 categories.
        </div>
        
        <div className="grid md:grid-cols-3">
          {Object.entries(selectedCauses).map(([category, causes]) => {
            if (!causes || causes.length === 0) return null;
            return (
              <div key={category} className={`fishbone-category ${categories[category].class}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <span style={{fontSize: '1.25rem'}}>{categories[category].icon}</span>
                  <h4 className="font-semibold">{category}</h4>
                  <span className="badge badge-outline">{causes.length}</span>
                </div>
                <div className="space-y-1">
                  {causes.map((cause, index) => (
                    <div key={index} className="text-sm p-2 bg-white rounded" style={{border: '1px solid #e5e7eb'}}>
                      {cause}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{background: '#f0fdf4'}}>
          <h4 className="font-semibold mb-2" style={{color: '#166534'}}>Next Steps</h4>
          <ul style={{listStyle: 'disc', paddingLeft: '1.5rem', color: '#166534'}}>
            <li>Prioritas penyebab berdasarkan impact dan likelihood</li>
            <li>Lakukan 5 Whys analysis untuk top penyebab</li>
            <li>Validasi dengan data dan evidence</li>
            <li>Develop action plan untuk address root causes</li>
          </ul>
        </div>
      </div>
    );
  }

  return null;
}

// Five Whys Analysis Component
function FiveWhysAnalysis({ scenario, onComplete }) {
  const [whySteps, setWhySteps] = useState([
    { question: `Mengapa ${scenario.title.toLowerCase()}?`, answer: '', evidence: '' }
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const addWhyStep = () => {
    const lastAnswer = whySteps[whySteps.length - 1].answer;
    if (lastAnswer.trim()) {
      setWhySteps(prev => [...prev, {
        question: `Mengapa ${lastAnswer.toLowerCase()}?`,
        answer: '',
        evidence: ''
      }]);
    }
  };

  const updateStep = (index, field, value) => {
    setWhySteps(prev => prev.map((step, i) => 
      i === index ? { ...step, [field]: value } : step
    ));
  };

  const completeAnalysis = () => {
    onComplete(whySteps);
  };

  return (
    <div className="space-y-6">
      <div className="alert alert-info">
        <strong>5 Whys Analysis</strong><br/>
        Teknik iteratif untuk menggali root cause dengan bertanya "mengapa" secara berulang.
      </div>

      <div className="card">
        <h4 className="font-semibold mb-2">Problem Statement</h4>
        <p className="p-4" style={{background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
          {scenario.problemStatement}
        </p>
      </div>

      <div className="space-y-4">
        {whySteps.map((step, index) => (
          <div key={index} className="card" style={{
            border: index === currentStep ? '2px solid #3b82f6' : '1px solid #e5e7eb',
            background: index === currentStep ? '#eff6ff' : 'white'
          }}>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`badge ${index <= currentStep ? 'badge-medium' : 'badge-outline'}`}>
                Why {index + 1}
              </span>
              <input
                type="text"
                value={step.question}
                onChange={(e) => updateStep(index, 'question', e.target.value)}
                className="font-semibold"
                style={{background: 'transparent', border: 'none', fontSize: '1rem'}}
              />
            </div>
            
            {index <= currentStep && (
              <>
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">Answer:</label>
                  <textarea
                    rows="2"
                    value={step.answer}
                    onChange={(e) => updateStep(index, 'answer', e.target.value)}
                    placeholder="Jawaban berdasarkan facts dan data..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Evidence:</label>
                  <textarea
                    rows="2"
                    value={step.evidence}
                    onChange={(e) => updateStep(index, 'evidence', e.target.value)}
                    placeholder="Evidence atau data yang mendukung jawaban..."
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="btn btn-outline"
        >
          Previous
        </button>
        
        <div className="space-x-2">
          {currentStep < whySteps.length - 1 ? (
            <button 
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!whySteps[currentStep].answer.trim()}
              className="btn"
            >
              Next Step
            </button>
          ) : (
            <>
              <button 
                onClick={addWhyStep}
                disabled={!whySteps[currentStep].answer.trim() || whySteps.length >= 7}
                className="btn btn-outline"
              >
                Add Why
              </button>
              <button 
                onClick={completeAnalysis}
                disabled={whySteps.length < 3 || !whySteps[whySteps.length - 1].answer.trim()}
                className="btn"
              >
                Complete Analysis
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Action Plan Component
function ActionPlanComponent({ scenario, analysisData, onComplete }) {
  const [actions] = useState([
    {
      id: 1,
      category: "Immediate",
      description: "Address critical system vulnerabilities",
      priority: "High",
      timeline: "1-2 weeks",
      owner: "Technical Team"
    },
    {
      id: 2,
      category: "Short-term", 
      description: "Implement monitoring and alerting systems",
      priority: "High",
      timeline: "3-4 weeks",
      owner: "DevOps Team"
    },
    {
      id: 3,
      category: "Long-term",
      description: "Develop comprehensive prevention strategy",
      priority: "Medium",
      timeline: "8-12 weeks", 
      owner: "Management Team"
    }
  ]);

  const [selectedActions, setSelectedActions] = useState([]);

  const toggleAction = (actionId) => {
    setSelectedActions(prev => 
      prev.includes(actionId) 
        ? prev.filter(id => id !== actionId)
        : [...prev, actionId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="alert alert-info">
        <strong>Action Plan Development</strong><br/>
        Berdasarkan hasil analisis, berikut adalah recommended actions untuk address root causes.
      </div>

      <div className="space-y-4">
        {actions.map(action => (
          <div 
            key={action.id}
            className="card cursor-pointer"
            style={{
              border: selectedActions.includes(action.id) ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              background: selectedActions.includes(action.id) ? '#eff6ff' : 'white'
            }}
            onClick={() => toggleAction(action.id)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                checked={selectedActions.includes(action.id)}
                onChange={() => toggleAction(action.id)}
              />
              <span className="badge badge-outline">{action.category}</span>
              <span className={getBadgeClass(action.priority)}>{action.priority}</span>
              <span className="badge badge-outline">{action.timeline}</span>
            </div>
            
            <h4 className="font-semibold mb-2">{action.description}</h4>
            <p className="text-sm" style={{color: '#6b7280'}}>
              <strong>Owner:</strong> {action.owner}
            </p>
          </div>
        ))}
      </div>

      <div className="card" style={{background: '#f0fdf4'}}>
        <h4 className="font-semibold mb-2" style={{color: '#166534'}}>
          Selected Actions: {selectedActions.length}
        </h4>
        <p className="text-sm" style={{color: '#166534'}}>
          Pilih actions yang akan diimplementasikan untuk mengatasi root causes yang teridentifikasi.
        </p>
      </div>

      <div className="text-center">
        <button 
          onClick={() => onComplete(actions.filter(a => selectedActions.includes(a.id)))}
          disabled={selectedActions.length === 0}
          className="btn"
        >
          Finalize Action Plan
        </button>
      </div>
    </div>
  );
}

// Summary Component
function SummaryAnalysis({ scenario, analysisData }) {
  const fishboneCount = Object.values(analysisData.fishbone).flat().length;
  const whysCount = analysisData.fiveWhys.length;
  const actionCount = analysisData.actionPlan.length;

  return (
    <div className="space-y-6">
      <div className="alert alert-success">
        <strong>Root Cause Analysis - Complete Summary</strong><br/>
        Hasil lengkap analisis untuk: <em>{scenario.title}</em>
      </div>

      <div className="grid md:grid-cols-3">
        <div className="card text-center">
          <h4 className="font-semibold mb-2" style={{color: '#16a34a'}}>Fishbone Analysis</h4>
          <div className="text-3xl font-bold mb-2">{fishboneCount}</div>
          <p className="text-sm">Potential causes identified</p>
        </div>
        
        <div className="card text-center">
          <h4 className="font-semibold mb-2" style={{color: '#2563eb'}}>5 Whys Analysis</h4>
          <div className="text-3xl font-bold mb-2">{whysCount}</div>
          <p className="text-sm">Deep analysis steps</p>
        </div>
        
        <div className="card text-center">
          <h4 className="font-semibold mb-2" style={{color: '#7c3aed'}}>Action Plan</h4>
          <div className="text-3xl font-bold mb-2">{actionCount}</div>
          <p className="text-sm">Actions to implement</p>
        </div>
      </div>

      {actionCount > 0 && (
        <div className="card" style={{background: '#f0fdf4'}}>
          <h4 className="font-semibold mb-4" style={{color: '#166534'}}>Recommended Next Steps</h4>
          <div className="space-y-2">
            {analysisData.actionPlan.slice(0, 3).map((action, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#16a34a',
                  borderRadius: '50%'
                }}></div>
                <span className="text-sm">{action.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <h4 className="font-semibold mb-4">Analysis Methodology Used</h4>
        <div className="grid md:grid-cols-2">
          <div className="p-4" style={{background: '#f8fafc', borderRadius: '8px'}}>
            <h5 className="font-semibold mb-1">Fishbone Diagram (Ishikawa)</h5>
            <p className="text-sm">Systematic identification of all potential causes</p>
          </div>
          <div className="p-4" style={{background: '#f8fafc', borderRadius: '8px'}}>
            <h5 className="font-semibold mb-1">5 Whys Technique</h5>
            <p className="text-sm">Iterative questioning to reach root cause</p>
          </div>
        </div>
      </div>
    </div>
  );
}