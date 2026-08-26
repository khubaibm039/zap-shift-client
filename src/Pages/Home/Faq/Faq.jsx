const Faq = () => {
  return (
    <div className="container w-full ">
      <div>
        <h1 className="text-4xl font-bold text-center mt-10">
          Frequently Asked Question (FAQ)
        </h1>
        <p className="text-center mt-4">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce <br /> pain, and strengthen your
          body with ease!
        </p>
      </div>
      <div>
        <div className="container mx-auto flex flex-col items-center justify-center py-12  gap-4 px-20">
          <div className="collapse collapse-arrow bg-[#E6F2F3] border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-bold">
              How do I create an account?
            </div>
            <div className="collapse-content text-lg">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </div>
          </div>
          <div className="collapse collapse-arrow  bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold">
              I forgot my password. What should I do?
            </div>
            <div className="collapse-content text-lg">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-lg">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title font-bold">
              How will I be notified when the product is back in stock?
            </div>
            <div className="collapse-content text-lg">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
