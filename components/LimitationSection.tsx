"use client";

export default function LimitationsSection() {
  const items = [
    {
      title: "May Provide Confident but Incorrect Answers",
      desc: `AskSorSU may sometimes produce responses that sound correct but are 
      factually wrong or incomplete. This may occur because there is no perfect 
      source of truth during training, making it challenging to balance accuracy 
      and caution.`,
    },
    {
      title: "Sensitive to Prompt Wording",
      desc: `Small changes in the wording of a question can lead AskSorSU to produce 
      different answers. In some cases, it may say it doesn't know the answer 
      with one phrasing but respond correctly with another.`,
    },
    {
      title: "Possible Verbosity or Repetition",
      desc: `AskSorSU might give longer answers than needed or repeat certain phrases. 
      This behavior comes from training patterns where longer responses are often 
      rated as more helpful.`,
    },
    {
      title: "Difficulty Asking Clarifying Questions",
      desc: `Instead of asking clarifying questions when a prompt is vague or incomplete, 
      AskSorSU may guess the user's intent, sometimes leading to inaccurate answers.`,
    },
    {
      title: "Potential Unsafe or Biased Responses",
      desc: `Despite built-in safety mechanisms, AskSorSU may still occasionally produce 
      unsafe, biased, or inappropriate responses. Moderation systems are used to 
      reduce harm, but they may not always be perfect.`,
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-[#800000]">Limitations</span>
        </h2>

        <div className="space-y-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 shadow-sm bg-gray-50 hover:shadow-md transition-all animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-semibold text-[#800000] mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
