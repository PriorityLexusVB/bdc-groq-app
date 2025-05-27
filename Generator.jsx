
import React, { useState } from 'react';

const tones = ['Luxury', 'Direct', 'Casual', 'Empathetic'];
const styles = ['Initial Email', 'Initial Text', 'Email Reply', 'Text Response'];

function Generator() {
  const [lead, setLead] = useState('');
  const [tone, setTone] = useState(tones[0]);
  const [style, setStyle] = useState(styles[0]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const callGroq = async () => {
    const systemPrompt = \`You are a luxury BDC assistant for Priority Lexus of Virginia Beach. Craft classy, polished, mobile-friendly responses to help schedule test drives, consultations, or walkarounds based on the input tone and style. Always highlight the 'Priorities for Life' perks and VIP experience. Never mention pricing or contact info.\`;
    const userPrompt = \`Lead Info: \${lead}\nTone: \${tone}\nStyle: \${style}\`;

    setLoading(true);
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
        }),
      });

      const data = await res.json();
      setResult(data.choices[0].message.content);
    } catch (err) {
      setResult('❌ Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl mx-auto">
      <textarea
        value={lead}
        onChange={(e) => setLead(e.target.value)}
        className="w-full p-2 border mb-4 rounded"
        rows={4}
        placeholder="Paste Lead Info Here"
      />
      <div className="flex gap-4 mb-4">
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          {tones.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          {styles.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <button
        onClick={callGroq}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Generating...' : 'Generate Reply'}
      </button>
      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}

export default Generator;
