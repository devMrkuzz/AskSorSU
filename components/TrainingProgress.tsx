export default function TrainingProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#800000]">
          How AskSorSU is Trained
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="border-l-4 border-[#800000] pl-6">
            <h3 className="text-xl font-bold mb-4">Step 1</h3>
            <h4 className="text-2xl font-semibold mb-4">
              Collect demonstration data and train a supervised policy.
            </h4>

            <p className="text-lg text-gray-700 mb-6">
              A prompt is sampled from the training dataset. Human labelers
              demonstrate the correct or preferred output.
            </p>

            <div className="text-lg p-4 rounded-xl bg-gray-100 mb-4">
              <p className="font-semibold mb-2 text-gray-800">
                Example Prompt:
              </p>
              <p className="text-lg text-gray-700">
                “Explain reinforcement learning to a 6-year-old.”
              </p>
            </div>

            <p className="text-lg text-gray-700">
              This supervised data is used to fine-tune the base model.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-[#800000] pl-6">
            <h3 className="text-xl font-bold mb-4">Step 2</h3>
            <h4 className="text-2xl font-semibold mb-4">
              Collect comparison data and train a reward model.
            </h4>

            <p className="text-lg text-gray-700 mb-6">
              Several model outputs are generated for the same prompt. Human
              labelers rank them from best to worst.
            </p>

            <div className="text-lg p-4 rounded-xl bg-gray-100 mb-4">
              <p className="font-semibold text-gray-800 mb-2">
                Example Ranking:
              </p>
              <p className="text-gray-700">D ＞ C ＞ A ＞ B</p>
            </div>

            <p className="text-lg text-gray-700">
              The rankings are used to train a reward model that scores future
              outputs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-[#800000] pl-6">
            <h3 className="text-xl font-bold mb-4">Step 3</h3>
            <h4 className="text-2xl font-semibold mb-4">
              Optimize the model using PPO reinforcement learning.
            </h4>

            <p className="text-lg text-gray-700 mb-6">
              A new prompt is sampled. The model generates an answer. The reward
              model scores the output, and PPO adjusts the model to improve
              future responses.
            </p>

            <div className="text-lg p-4 rounded-xl bg-gray-100 mb-4">
              <p className="font-semibold text-gray-800 mb-2">
                Example Prompt:
              </p>
              <p className="text-gray-700">“Write a story about otters.”</p>
            </div>

            <p className="text-lg text-gray-700">
              This loop continues, improving the policy step-by-step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
