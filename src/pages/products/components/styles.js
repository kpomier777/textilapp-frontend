import PropTypes from "prop-types"
import styled, { keyframes } from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4rem;
  width: 100%;
  padding: 80px 64px 32px 64px;
  box-sizing: border-box;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  padding: 0px 64px;
  box-sizing: border-box;
`

export const SubContent = styled.div`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  align-items: ${(props) => props.$align};
  justify-content: ${(props) => props.$justify};
  gap: 4px;
  padding: ${(props) => `${props.$paddingY}px ${props.$paddingX}px`};
  box-sizing: border-box;
`

export const TextTitle = styled.h1`
  padding: 0;
  margin: 0;
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$size}px;
  font-family: "DM Sans", sans-serif;
  font-weight: 700;
`

export const TextSubTitle = styled.h3`
  padding: 0;
  margin: 0;
  color: ${(props) => props.$color};
  font-family: "DM Sans", sans-serif;
  font-weight: 300;
`
export const TextHighLight = styled.span`
  color: ${(props) => props.$color};
`

const dotsAnimationFrames = keyframes`
 30% { opacity: 1 }
 40% { opacity: 0.3; }
 100% { opacity: 0.6; }
`

export const DotAnimation = styled.span`
  opacity: 0;
  animation: ${dotsAnimationFrames} 1.5s infinite;
  animation-delay: ${(props) => props.$delay}!important;
`

/* PropTypes */

Header.propTypes = {
  $backgroundColor: PropTypes.string,
}
Header.defaultProps = {
  $backgroundColor: "var(--color-citric)",
}
SubContent.propTypes = {
  $align: PropTypes.string,
  $justify: PropTypes.string,
  $direction: PropTypes.string,
  $paddingX: PropTypes.number,
  $paddingY: PropTypes.number,
}
SubContent.defaultProps = {
  $align: "center",
  $justify: "flex-start",
  $direction: "column",
  $paddingX: 0,
  $paddingY: 0,
}
TextTitle.propTypes = {
  $color: PropTypes.string,
  $size: PropTypes.number,
}
TextTitle.defaultProps = {
  $color: "var(--color-neutral-background-1)",
  $size: 32,
}
TextHighLight.propTypes = {
  $color: PropTypes.string,
}
TextHighLight.defaultProps = {
  $color: "var(--color-neutral-background-1)",
}
DotAnimation.propTypes = {
  $delay: PropTypes.string,
}
DotAnimation.defaultProps = {
  $delay: "1000ms",
}

export default {}
