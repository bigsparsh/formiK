import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-semibold text-5xl text-center text-white mix-blend-difference work">
        {children}
      </h1>
    ),
    ...components,
  };
}
