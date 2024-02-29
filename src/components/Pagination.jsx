/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Button } from "@fluentui/react-components"
import {
  IosArrowLtr24Filled,
  IosArrowRtl24Filled,
  MoreHorizontal24Filled,
} from "@fluentui/react-icons"

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export default function Pagination({
  pageCount,
  selectedPage,
  selectedBackColor,
  selectedTextColor,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(selectedPage)
  const firstPage = 1
  const lastPage = pageCount

  if (pageCount <= 0 || selectedPage <= 0) {
    return <span />
  }

  const handleClickEvent = (selectedPageIndex) => {
    if (window) {
      window.scrollTo(0, 0)
    }
    onPageChange(selectedPageIndex)
  }

  const navigateBarEvent = (indexNavigate) => {
    if (indexNavigate >= firstPage && indexNavigate <= lastPage) {
      setCurrentPage(indexNavigate)
    }
  }

  const buildArraySpacesForward = (indexPage) => {
    const arraySpaces = []
    const partialEnd = indexPage + 2
    const endPage = partialEnd <= lastPage ? partialEnd : lastPage
    for (let index = indexPage; index <= endPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildArraySpacesBack = (indexPage) => {
    const arraySpaces = []
    const partialEnd = indexPage - 2
    const endPage = partialEnd >= firstPage ? partialEnd : firstPage
    for (let index = endPage; index <= indexPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildArraySpacesMiddle = (indexPage) => {
    const arraySpaces = []
    const partialEnd = indexPage + 1
    const partialStart = indexPage - 1
    const startPage = partialStart >= firstPage ? partialStart : firstPage
    const endPage = partialEnd <= lastPage ? partialEnd : lastPage
    for (let index = startPage; index <= endPage; index += 1) {
      arraySpaces.push(index)
    }
    return arraySpaces
  }

  const buildButtons = (arrayList) => (
    <>
      {arrayList.map((page, index) => (
        <Button
          appearance={`${page === selectedPage ? "primary" : "subtle"}`}
          key={`button${index}`}
          onClick={() => {
            handleClickEvent(page)
          }}
          style={{
            minWidth: "30px",
            background: page === selectedPage ? selectedBackColor : "",
            color: page === selectedPage ? selectedTextColor : "",
          }}
        >
          {page}
        </Button>
      ))}
    </>
  )

  const buildMiddleButton = (indexPage) => {
    if (indexPage === 1) {
      return buildButtons(buildArraySpacesForward(indexPage))
    }
    if (indexPage === lastPage) {
      return buildButtons(buildArraySpacesBack(indexPage))
    }
    return buildButtons(buildArraySpacesMiddle(indexPage))
  }

  const backNavigateValidation = () => currentPage > 2 && lastPage > 3
  const nextNavigateValidation = () =>
    currentPage < lastPage - 1 && lastPage > 3

  return (
    <PaginationWrapper>
      <Button
        disabled={selectedPage === firstPage}
        appearance="subtle"
        icon={<IosArrowLtr24Filled />}
        onClick={() => {
          handleClickEvent(selectedPage - 1)
        }}
      />
      <Button
        disabled={!backNavigateValidation()}
        appearance="subtle"
        icon={
          <MoreHorizontal24Filled
            onClick={() => {
              navigateBarEvent(currentPage - 2)
            }}
          />
        }
      />
      {buildMiddleButton(currentPage)}
      <Button
        disabled={!nextNavigateValidation()}
        appearance="subtle"
        icon={
          <MoreHorizontal24Filled
            onClick={() => {
              navigateBarEvent(currentPage + 2)
            }}
          />
        }
      />
      <Button
        disabled={selectedPage === lastPage}
        appearance="subtle"
        icon={<IosArrowRtl24Filled />}
        onClick={() => {
          handleClickEvent(selectedPage + 1)
        }}
      />
    </PaginationWrapper>
  )
}

Pagination.propTypes = {
  pageCount: PropTypes.number,
  selectedPage: PropTypes.number,
  selectedBackColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  onPageChange: PropTypes.func,
}

Pagination.defaultProps = {
  pageCount: 0,
  selectedPage: 0,
  selectedBackColor: "var(--colorBrandBackground)",
  selectedTextColor: "var(--colorNeutralForegroundOnBrand)",
  onPageChange: () => {},
}
