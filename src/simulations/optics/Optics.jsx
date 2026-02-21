import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Info, Maximize2, Minimize2, Video, StopCircle, AlertCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useOptics from './hooks/useOptics';
import OpticsCanvas from './components/OpticsCanvas';
import OpticsControls from './components/OpticsControls';

const Optics = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);

  const t = {
    title: "Optique - Réflexion & Réfraction",
    description: "Explore les lois de Snell-Descartes avec des rayons lumineux.",
    editMode: "Ajuste l'angle et observe",
    recording: "Enregistrement..."
  };

  const {
    incidentAngle, setIncidentAngle,
    n1, setN1,
    n2, setN2,
    surfaceType, setSurfaceType,
    rayType, setRayType,
    wavelength, setWavelength,
    isRunning, setIsRunning,
    reflectedAngle,
    refractedAngle,
    criticalAngle,
    totalInternalReflection,
    getRayColor,
    predefinedMaterials
  } = useOptics();

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    try {
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 2500000
      });

      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        a.download = `optics-${date}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsRecording(false);
        setRecordingTime(0);
      };

      recorder.start(1000);
      setMediaRecorder(recorder);
      setIsRecording(true);

    } catch (error) {
      console.error("Erreur d'enregistrement:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-off-white)', color: 'var(--color-text-primary)' }}>
      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ background: 'rgba(253,248,240,0.95)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full transition-colors"
            style={{ color: 'var(--color-earth-brown)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-bg)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-bold tracking-tight text-base" style={{ color: 'var(--color-text-primary)' }}>
            {t.title}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="p-2 rounded-full transition-all"
              style={isRecording
                ? { background: 'var(--color-danger)', color: '#fff' }
                : { color: 'var(--color-earth-brown)' }}
              onMouseEnter={e => { if (!isRecording) e.currentTarget.style.background = 'var(--color-primary-bg)'; }}
              onMouseLeave={e => { if (!isRecording) e.currentTarget.style.background = 'transparent'; }}
            >
              {isRecording ? <StopCircle size={22} /> : <Video size={22} />}
            </button>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 rounded-full transition-colors"
              style={{ color: 'var(--color-info)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-info-bg)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Info size={22} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ZONE VISUELLE */}
          <div className="flex-1 space-y-6">
            <div
              ref={containerRef}
              className={`relative rounded-[2.5rem] shadow-xl overflow-hidden transition-all ${
                isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'p-2'
              }`}
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              {!isRunning && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-earth-brown)' }}>
                    <AlertCircle size={14} /> {t.editMode.toUpperCase()}
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="absolute top-6 left-6 z-20 flex items-center gap-3 px-4 py-2 rounded-full shadow-lg"
                  style={{ background: 'var(--color-danger)', color: '#fff' }}>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-bold">REC {formatTime(recordingTime)}</span>
                </div>
              )}

              <div className="absolute bottom-6 right-6 z-20 flex gap-3">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className="p-4 rounded-2xl shadow-xl active:scale-90 transition-transform"
                  style={isRecording
                    ? { background: 'var(--color-danger)', color: '#fff' }
                    : { background: 'var(--btn-overlay-bg)', color: 'var(--btn-overlay-text)' }}
                >
                  {isRecording ? <StopCircle size={22} /> : <Video size={22} />}
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-4 rounded-2xl shadow-xl active:scale-90 transition-transform"
                  style={{ background: 'var(--btn-overlay-bg)', color: 'var(--btn-overlay-text)' }}
                >
                  {isFullscreen ? <Minimize2 size={22} /> : <Maximize2 size={22} />}
                </button>
              </div>

              <OpticsCanvas
                incidentAngle={incidentAngle}
                reflectedAngle={reflectedAngle}
                refractedAngle={refractedAngle}
                surfaceType={surfaceType}
                rayType={rayType}
                n1={n1}
                n2={n2}
                totalInternalReflection={totalInternalReflection}
                getRayColor={getRayColor}
                isRunning={isRunning}
                isFullscreen={isFullscreen}
              />
            </div>

            {/* Observation */}
            <div className="p-6 rounded-[2rem] shadow-sm"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 className="flex items-center gap-2 font-bold text-lg mb-3"
                style={{ color: 'var(--color-text-primary)' }}>
                <BookOpen size={20} style={{ color: 'var(--color-info)' }} /> Observation
              </h3>
              <p className="leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>
                "n₁ sin θ₁ = n₂ sin θ₂ — La lumière change de direction en changeant de milieu."
              </p>
            </div>
          </div>

          {/* ZONE CONTRÔLES */}
          <aside className="lg:w-96 space-y-6">
            <OpticsControls
              incidentAngle={incidentAngle}
              onIncidentAngleChange={setIncidentAngle}
              n1={n1}
              onN1Change={setN1}
              n2={n2}
              onN2Change={setN2}
              surfaceType={surfaceType}
              onSurfaceTypeChange={setSurfaceType}
              rayType={rayType}
              onRayTypeChange={setRayType}
              wavelength={wavelength}
              onWavelengthChange={setWavelength}
              reflectedAngle={reflectedAngle}
              refractedAngle={refractedAngle}
              criticalAngle={criticalAngle}
              totalInternalReflection={totalInternalReflection}
              predefinedMaterials={predefinedMaterials}
              isRunning={isRunning}
              onToggleRunning={() => setIsRunning(!isRunning)}
              onReset={() => {
                setIncidentAngle(30);
                setN1(1.0);
                setN2(1.5);
                setSurfaceType('plan');
                setRayType('both');
                setWavelength(550);
                setIsRunning(false);
              }}
            />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Optics;
