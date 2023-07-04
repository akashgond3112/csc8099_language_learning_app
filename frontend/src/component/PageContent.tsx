import React from "react";

type Props = {
  title: string;
  children: any;
};

function PageContent({ title, children }: Props) {
  return (
    <div style={{ textAlign: `center` }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
