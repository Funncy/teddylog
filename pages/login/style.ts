import styled from "styled-components";
import {Layout} from "antd";
import {Content} from "antd/lib/layout/layout";

export const LayoutWrappper = styled(Layout)`
  width: 100%;
  display: flex;
  height: 100vh;`;

export const ContentWrapper = styled(Content)`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  max-width: 1100px;
`

export const Title = styled.span`
  font-size: 24px;
  font-weight: bold;
  align-self: center;
  display: flex;
  margin: 0;
  padding-bottom: 20px;
`