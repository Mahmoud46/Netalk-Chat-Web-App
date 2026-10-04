import { useState, type ReactNode } from "react";
import terms_conditions_privacy_policy from "../assets/data/terms_conditions_privacy.json";
import { Link } from "react-router-dom";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";
import { BrandIcon, BrandWordmark } from "../components/icons/BrandIcon";
import { useTheme } from "../hooks";

export default function TermsConditonsPrivayPolicy(): ReactNode {
  const { theme } = useTheme();
  const [openList01, setOpenList01] = useState<boolean>(false);
  const [openList02, setOpenList02] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="flex text-foreground-light-secondary dark:text-foreground-dark-secondary min-h-dvh bg-background-light-base dark:bg-background-dark-base">
      <aside
        className={`z-50 h-dvh w-70 transition-all ease-in-out max-md:fixed ${open ? "flex" : "hidden md:flex"}`}
      >
        <div
          className={`flex flex-col items-start h-full w-full p-4 bg-background-light-surface-1 dark:bg-background-dark-surface-1 gap-8`}
        >
          <div className="flex justify-between w-full">
            <Link to="/" className="flex items-center gap-3">
              <BrandIcon className="size-8" theme={theme} />
              <BrandWordmark className="h-10" />
            </Link>

            <button
              type="button"
              className="relative hidden max-md:flex flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              onClick={() => setOpen(false)}
            >
              <CommonIcon
                label="x"
                weight="thin"
                className={`size-7 transition-all ease-in-out rotate-180`}
              />
              <Label text="Close" />
            </button>
          </div>
          <ul className="space-y-4 flex-1">
            <div>
              <div
                className="flex items-center"
                onClick={() => {
                  setOpenList01((prev) => !prev);
                  setOpenList02(false);
                }}
              >
                <button type="button" className="cursor-pointer">
                  <CommonIcon
                    label="chevron_right"
                    weight="thin"
                    className={`size-7 rotate-90 transition-all ease-in-out ${openList01 && "rotate-270"}`}
                  />
                </button>
                <a
                  href={`#${terms_conditions_privacy_policy.documents.terms.title}`}
                  className="hover:underline hover:text-foreground-dark-primary w-fit"
                >
                  {terms_conditions_privacy_policy.documents.terms.title}
                </a>{" "}
              </div>
              {openList01 && (
                <ul className="text-sm pl-7 flex flex-col">
                  {terms_conditions_privacy_policy.documents.terms.sections.map(
                    (section) => (
                      <a
                        href={`#${section.id}`}
                        id={`link-${section.id}`}
                        key={`link-${section.id}`}
                        className="hover:underline hover:text-foreground-dark-primary w-fit"
                        dangerouslySetInnerHTML={{ __html: section.title }}
                      ></a>
                    ),
                  )}
                </ul>
              )}
            </div>
            <div>
              <div
                className="flex items-center"
                onClick={() => {
                  setOpenList02((prev) => !prev);
                  setOpenList01(false);
                }}
              >
                <button type="button" className="cursor-pointer">
                  <CommonIcon
                    label="chevron_right"
                    weight="thin"
                    className={`size-7 rotate-90 transition-all ease-in-out ${openList02 && "rotate-270"}`}
                  />
                </button>
                <a
                  href={`#${terms_conditions_privacy_policy.documents.privacy.title}`}
                  className="hover:underline hover:text-foreground-dark-primary w-fit"
                >
                  {terms_conditions_privacy_policy.documents.privacy.title}
                </a>{" "}
              </div>
              {openList02 && (
                <ul className="text-sm pl-7 flex flex-col">
                  {terms_conditions_privacy_policy.documents.privacy.sections.map(
                    (section) => (
                      <a
                        id={`link-${section.id}`}
                        className="hover:underline hover:text-foreground-dark-primary w-fit"
                        href={`#${section.id}`}
                        key={`link-${section.id}`}
                        dangerouslySetInnerHTML={{ __html: section.title }}
                      ></a>
                    ),
                  )}
                </ul>
              )}
            </div>
          </ul>
          <p className="text-xs">
            © 2026 Netalk. Made for better conversations.
          </p>
        </div>
      </aside>
      <div className="max-h-dvh overflow-auto flex-1 flex flex-col items-center gap-8 px-4 pb-4">
        <div className="sticky top-4 w-full max-w-200 flex items-center justify-start z-40 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 rounded-3xl">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative hidden max-md:flex flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="sidebar"
              weight="thin"
              className={`size-7 transition-all ease-in-out rotate-180`}
            />
            <Label text="Open" />
          </button>
          <div className="flex items-center justify-start gap-2">
            <Link
              to={"/app"}
              className="relative flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 transition-all ease-in-out rotate-180`}
              />
              <Label text="Back" />
            </Link>
            <div className="flex flex-col flex-1">
              <h1 className="font-semibold text-base text-foreground-light-secondary dark:text-foreground-dark-secondary leading-5 line-clamp-1">
                Terms & Conditions and Privacy Policy
              </h1>
              <p className="text-xs">
                Updated at {terms_conditions_privacy_policy.lastUpdated}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-200 w-full gap-4 flex flex-col ">
          <div
            className="w-full flex flex-col gap-3"
            id={terms_conditions_privacy_policy.documents.terms.title}
          >
            <h2 className="text-2xl font-semibold text-foreground-dark-primary">
              {terms_conditions_privacy_policy.documents.terms.title}
            </h2>
            <>
              {terms_conditions_privacy_policy.documents.terms.sections.map(
                (section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="flex flex-col gap-1"
                  >
                    <h3
                      className="font-semibold text-lg"
                      dangerouslySetInnerHTML={{ __html: section.title }}
                    ></h3>
                    <p
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: section.paragraphs }}
                    ></p>
                    {section.list && (
                      <ul className="list-disc ml-4 text-sm">
                        {section.list.map((ele) => (
                          <li
                            key={ele}
                            className=""
                            dangerouslySetInnerHTML={{ __html: ele }}
                          ></li>
                        ))}
                      </ul>
                    )}
                    {section.notice && (
                      <p
                        className="text-xs italic text-foreground-dark-danger bg-background-dark-danger p-1 px-3 rounded-3xl"
                        dangerouslySetInnerHTML={{ __html: section.notice }}
                      ></p>
                    )}
                  </section>
                ),
              )}
            </>
          </div>
          <div
            className="w-full flex flex-col gap-3"
            id={terms_conditions_privacy_policy.documents.privacy.title}
          >
            <h2 className="text-2xl font-semibold text-foreground-dark-primary">
              {terms_conditions_privacy_policy.documents.privacy.title}
            </h2>
            <>
              {terms_conditions_privacy_policy.documents.privacy.sections.map(
                (section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="flex flex-col gap-1"
                  >
                    <h3
                      className="font-semibold text-lg"
                      dangerouslySetInnerHTML={{ __html: section.title }}
                    ></h3>
                    <p
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: section.paragraphs }}
                    ></p>
                    {section.list && (
                      <ul className="list-disc ml-4 text-sm">
                        {section.list.map((ele) => (
                          <li
                            key={ele}
                            className=""
                            dangerouslySetInnerHTML={{ __html: ele }}
                          ></li>
                        ))}
                      </ul>
                    )}
                    {section.notice && (
                      <p
                        className="text-xs italic text-foreground-dark-danger bg-background-dark-danger p-1 px-3 rounded-3xl"
                        dangerouslySetInnerHTML={{ __html: section.notice }}
                      ></p>
                    )}
                  </section>
                ),
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
