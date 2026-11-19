interface Env { GEMINI_API_KEY?: string }
export const onRequestPost = async (context: {request:Request;env:Env}):Promise<Response> => {
 const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
 if(!context.env.GEMINI_API_KEY)return json({error:'Gemini API anahtarı yapılandırılmadı.'},503);
 let body:{topic?:string;prompt?:string};try{body=await context.request.json() as typeof body}catch{return json({error:'Geçersiz istek.'},400)}
 if(typeof body.prompt!=='string'||!body.prompt.trim()||body.prompt.length>3000)return json({error:'Soru 1-3000 karakter olmalı.'},400);
 const topic=typeof body.topic==='string'?body.topic.slice(0,80):'Eğitim';
 const instruction='Türkçe yanıt ver. Eğitim amaçlı, doğru ve özlü ol. Bilmediğin bilgiyi uydurma. Matematikte işlemleri doğrula. Öğrenciler hakkında teşhis üretme. Kullanıcının gönderdiği kişisel verileri tekrar etme.';
 try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);let response:Response;try{response=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json','x-goog-api-key':context.env.GEMINI_API_KEY},body:JSON.stringify({systemInstruction:{parts:[{text:instruction}]},contents:[{role:'user',parts:[{text:'Konu: '+topic+'\nSoru: '+body.prompt}]}],generationConfig:{maxOutputTokens:1100}})})}finally{clearTimeout(timer)}
 if(!response.ok)return json({error:'Yapay zekâ servisi geçici olarak yanıt vermiyor.'},502);const data=await response.json() as {candidates?:{content?:{parts?:{text?:string}[]}}[]};const text=data.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'';return json({text:text||'Yanıt üretilemedi.'})
 }catch{return json({error:'Yapay zekâ bağlantısı zaman aşımına uğradı.'},504)}
};