import { Fragment } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Skeleton, SkeletonItem } from "@fluentui/react-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const WrapperRow = styled.div`
  display: grid;
  grid-template-columns: 40px repeat(${(props) => props.$cols || 0}, 1fr);
  grid-template-rows: repeat(auto-fill, 35px);
  grid-row-gap: 0.3em;
  grid-column-gap: 0.6em;
  &.first {
    grid-template-columns: auto;
  }
`

export default function TableSkeleton({ rows, cols }) {
  const rowsIterator = Array(rows).fill(0)
  const colsIterator = Array(cols).fill(0)
  return (
    <Wrapper>
      {rowsIterator.map((_, indexRow) => (
        <Fragment key={`rowSkeleton${indexRow}`}>
          {indexRow === 0 && (
            <WrapperRow className="first" $cols={cols - 1}>
              <Skeleton>
                <SkeletonItem shape="rectangle" style={{ height: "35px" }} />
              </Skeleton>
            </WrapperRow>
          )}
          <WrapperRow $cols={cols - 1}>
            {colsIterator.map((__, indexCol) => (
              <Skeleton key={`colSkeleton${indexCol}`}>
                <SkeletonItem
                  shape="rectangle"
                  style={{
                    height: "35px",
                    width: indexCol === 0 ? "40px" : "auto",
                  }}
                />
              </Skeleton>
            ))}
          </WrapperRow>
          {indexRow === rows - 1 && (
            <WrapperRow $cols={cols - 1}>
              <Skeleton
                style={{
                  gridColumnStart: 2,
                  gridColumnEnd: -2,
                }}
              >
                <SkeletonItem
                  shape="rectangle"
                  style={{
                    height: "35px",
                  }}
                />
              </Skeleton>
            </WrapperRow>
          )}
        </Fragment>
      ))}
    </Wrapper>
  )
}

TableSkeleton.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
}

TableSkeleton.defaultProps = {
  rows: 0,
  cols: 0,
}
