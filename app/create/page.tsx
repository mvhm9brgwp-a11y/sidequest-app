"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateClub() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    duration: "30",
    amount: "",
    venmo: "",
    vibe: "",
    difficulty: "medium",
    avoid: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const launch = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("clubs").insert([form]).select();
    setLoading(false);
    if (error) {
      alert("Something went wrong: " + JSON.stringify(error));
    } else {
        alert("Club ID: " + JSON.stringify(data));
    }
  };

  return (
    <main style={{background:"#1a1a2e",minHeight:"100vh",color:"white",padding:"40px 24px",maxWidth:"500px",margin:"0 auto"}}>
      <h1 style={{fontSize:"24px",fontWeight:"700",marginBottom:"32px"}}>Create a Club</h1>

      <div style={{display:"flex",gap:"8px",marginBottom:"32px"}}>
        {[1,2,3].map((s) => (
          <div key={s} style={{height:"4px",flex:"1",borderRadius:"99px",background: s <= step ? "white" : "rgba(255,255,255,0.2)"}}/>
        ))}
      </div>

      {step === 1 && (
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <h2 style={{margin:"0 0 8px"}}>Name your club</h2>
          <input style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"12px",padding:"12px 16px",color:"white",fontSize:"16px",boxSizing:"border-box"}} placeholder="Club name" value={form.name} onChange={(e) => update("name", e.target.value)}/>
          <input style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"12px",padding:"12px 16px",color:"white",fontSize:"16px",boxSizing:"border-box"}} placeholder="Amount per person $" type="number" value={form.amount} onChange={(e) => update("amount", e.target.value)}/>
          <input style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"12px",padding:"12px 16px",color:"white",fontSize:"16px",boxSizing:"border-box"}} placeholder="Venmo @handle" value={form.venmo} onChange={(e) => update("venmo", e.target.value)}/>
          <button onClick={() => setStep(2)} style={{background:"white",color:"#1a1a2e",fontWeight:"700",padding:"16px",borderRadius:"99px",border:"none",fontSize:"16px",cursor:"pointer",marginTop:"8px"}}>Next →</button>
        </div>
      )}

      {step === 2 && (
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <h2 style={{margin:"0 0 8px"}}>Set the vibe</h2>
          <textarea style={{width:"100%",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:"12px",padding:"12px 16px",color:"white",fontSize:"16px",boxSizing:"border-box",height:"112px",resize:"none"}} placeholder="Describe your crew's vibe..." value={form.vibe} onChange={(e) => update("vibe", e.target.value)}/>
          <div style={{display:"flex",gap:"12px"}}>
            <button onClick={() => setStep(1)} style={{flex:"1",background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"white",fontWeight:"700",padding:"16px",borderRadius:"99px",fontSize:"16px",cursor:"pointer"}}>← Back</button>
            <button onClick={() => setStep(3)} style={{flex:"1",background:"white",color:"#1a1a2e",fontWeight:"700",padding:"16px",borderRadius:"99px",border:"none",fontSize:"16px",cursor:"pointer"}}>Next →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
          <h2 style={{margin:"0 0 8px"}}>Ready to launch</h2>
          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:"16px",padding:"20px",border:"1px solid rgba(255,255,255,0.1)"}}>
            <p><strong>Club:</strong> {form.name}</p>
            <p><strong>Per person:</strong> ${form.amount}</p>
            <p><strong>Venmo:</strong> {form.venmo}</p>
            <p><strong>Vibe:</strong> {form.vibe}</p>
          </div>
          <div style={{display:"flex",gap:"12px"}}>
            <button onClick={() => setStep(2)} style={{flex:"1",background:"transparent",border:"1px solid rgba(255,255,255,0.2)",color:"white",fontWeight:"700",padding:"16px",borderRadius:"99px",fontSize:"16px",cursor:"pointer"}}>← Back</button>
            <button onClick={launch} disabled={loading} style={{flex:"1",background:"white",color:"#1a1a2e",fontWeight:"700",padding:"16px",borderRadius:"99px",border:"none",fontSize:"16px",cursor:"pointer",opacity:loading ? 0.5 : 1}}>
              {loading ? "Launching..." : "Launch 🚀"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}