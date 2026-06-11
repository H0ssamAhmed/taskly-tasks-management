export interface MyIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
}
