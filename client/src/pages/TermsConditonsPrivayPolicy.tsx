import { type ReactNode } from "react";
import terms_conditions_privacy_policy from "../assets/data/terms_conditions_privacy.json";
import { BrandIcon } from "../components/icons/BrandIcon";
import { Link } from "react-router-dom";

export default function TermsConditonsPrivayPolicy(): ReactNode {
  return (
    <div className=" relative w-full min-h-dvh flex flex-col items-center bg-background-light-base gap-6 md:gap-8 p-4 md:px-10 py-4 text-foreground-light-secondary dark:text-foreground-dark-secondary dark:bg-background-dark-base">
      <div className="sticky flex-wrap top-4 w-full max-w-200 flex items-center justify-start gap-4 z-40 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 pl-3 rounded-3xl">
        <Link to={"/"}>
          <BrandIcon className="size-8" />
        </Link>
        <div className="flex flex-col flex-1">
          <h1 className="text-lg md:text-xl font-semibold line-clamp-1">
            Terms & Conditions and Privacy Policy
          </h1>
          <p className="text-xs md:text-sm">
            Updated at {terms_conditions_privacy_policy.lastUpdated}
          </p>
        </div>
      </div>
      <div className="max-w-200 w-full gap-6 md:gap-8 flex flex-col">
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-foreground-dark-primary">
            {terms_conditions_privacy_policy.documents.terms.title}
          </h2>
          <>
            {terms_conditions_privacy_policy.documents.terms.sections.map(
              (section) => (
                <section key={section.id} className="flex flex-col gap-1">
                  <h3 className="font-semibold text-base md:text-lg">
                    {section.title}
                  </h3>
                  <p className="text-sm md:text-base">{section.paragraphs}</p>
                  {section.list && (
                    <ul className="list-disc ml-4 text-sm md:text-base">
                      {section.list.map((ele) => (
                        <li key={ele} className="">
                          {ele}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.notice && (
                    <p className="text-xs md:text-sm italic text-foreground-dark-danger">
                      {section.notice}
                    </p>
                  )}
                </section>
              ),
            )}
          </>
        </div>
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <h2 className="text-lg md:text-xl font-semibold text-foreground-dark-primary">
            {terms_conditions_privacy_policy.documents.privacy.title}
          </h2>
          <>
            {terms_conditions_privacy_policy.documents.privacy.sections.map(
              (section) => (
                <section key={section.id} className="flex flex-col gap-1">
                  <h3 className="font-semibold text-base md:text-lg">
                    {section.title}
                  </h3>
                  <p className="text-sm md:text-base">{section.paragraphs}</p>
                  {section.list && (
                    <ul className="list-disc ml-4 text-sm md:text-base">
                      {section.list.map((ele) => (
                        <li key={ele} className="">
                          {ele}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.notice && (
                    <p className="text-xs md:text-sm italic text-foreground-dark-danger">
                      {section.notice}
                    </p>
                  )}
                </section>
              ),
            )}
          </>
        </div>
      </div>
    </div>
  );
}
