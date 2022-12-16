import React from "react";
import styled from "@emotion/styled";

const Button = styled.button`
  background-color: red;
`;

const OverridedButton = styled(Button)`
  background-color: blue;
`;

const NestWrapper = styled.div`
  ${Button} {
    color: white;
    background: green;
  }
`;

export default function Home() {
  return (
    <>
      <Button style={{ backgroundColor: "violet" }}>Button</Button>
      <OverridedButton as="div">Button</OverridedButton>
      <NestWrapper>
        <Button>hello</Button>
      </NestWrapper>
    </>
  );
}
