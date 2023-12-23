import { SVGProps } from "react"
const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="2em"
    role="presentation"
    viewBox="0 0 24 24"
    width="2em"
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M6 12h12" />
      <path d="M12 18V6" />
    </g>
  </svg>
)
export default PlusIcon