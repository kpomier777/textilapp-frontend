/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  ArrowClockwise24Filled,
  AddCircle24Filled,
  PersonLockFilled,
  Search24Filled,
  EditRegular,
  PersonFilled,
} from "@fluentui/react-icons"
import {
  Label,
  Input,
  Switch,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
} from "@fluentui/react-components"

import { toast } from "sonner"
import moment from "moment"
import HeaderList from "@/pages/products/components/HeaderList"
import "moment/dist/locale/es"

import {
  Content,
  Header,
  SubContent,
  TextTitle,
  TextSubTitle,
  Wrapper,
  DotAnimation,
} from "@/pages/products/components/styles"
import { ButtonPrimary } from "@/pages/products/components/styles-tailwind"
import TextilService from "@/services/textil-service"
import Separator from "@/components/Separator"
import { isNotAuthorized } from "@/helpers/check-status"
import Pagination from "@/components/Pagination"
import {
  ORDERBY_ASC,
  ORDERBY_DESC,
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_START,
} from "@/config/constants"
import TableSkeleton from "@/components/TableSkeleton"
import {
  THEME_COLOR_CONFIGURATIONS,
  THEME_TEXT_CONFIGURATIONS,
} from "@/config/theme-color"
import { ENTITY_AUTH } from "@/config/entities"

const columns = [
  { columnKey: "userName", label: "Usuario" },
  { columnKey: "userRol", label: "Rol" },
  { columnKey: "createdAt", label: "Creado" },
  { columnKey: "action", label: "Acciones" },
]

moment.locale("es")

export default function UserList() {
  const inputSearch = useRef()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageCount: 0,
    resultCount: 0,
  })
  const [currentOrderby, setCurrentOrderby] = useState(ORDERBY_ASC)
  const [currentSearch, setCurrentSearch] = useState("")
  const [recentSearch, setRecentSearch] = useState("")

  const navigate = useNavigate()

  const { token } = useSelector((state) => state.userAuth)

  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_AUTH)

  const formattedData = (date) => {
    const formated = moment(date, "YYYY/MM/DD HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    )
    return moment(formated).calendar()
  }

  const cleanPagination = () => {
    setPagination({
      pageIndex: 0,
      pageCount: 0,
      resultCount: 0,
    })
  }

  const checkParams = (page) => {
    const paramsArray = []
    if (currentSearch !== "") {
      paramsArray.push({
        key: "search",
        value: currentSearch,
      })
    }
    /* Number Page */
    paramsArray.push({
      key: "page",
      value: page,
    })
    /* Orderby */
    paramsArray.push({
      key: "orderby",
      value: currentOrderby,
    })
    return paramsArray
  }

  const getList = (page, params = null) => {
    setLoading(true)
    cleanPagination()
    const paramsURL = params || TextilService.getParamsURL(checkParams(page))
    TextilService.getList(
      paramsURL,
      (response) => {
        const { data: rawResponse } = response
        const { pagination: paginationResponse } = rawResponse
        if (rawResponse.status) {
          setList(rawResponse.data)
          setPagination({
            pageCount: paginationResponse?.navigation?.last,
            pageIndex: paginationResponse?.page?.index,
            resultCount: paginationResponse?.result?.count,
          })
        } else {
          setList([])
          setMessage(rawResponse.message)
        }
      },
      (error) => {
        const { status = 0 } = error.request
        if (isNotAuthorized(status)) {
          navigate("/logout")
        }
        toast.error(error.message)
      },
      () => {
        setLoading(false)
      }
    )
  }

  const onPageChange = (page) => {
    getList(page)
  }

  const onOrderbyChange = (e) => {
    if (e.target.checked) {
      setCurrentOrderby(ORDERBY_DESC)
    } else {
      setCurrentOrderby(ORDERBY_ASC)
    }
  }

  const onSearch = (e) => {
    if (e.keyCode === 13) {
      getList(PAGINATION_PAGE_START)
    }
  }

  const onReset = () => {
    setRecentSearch("")
    setCurrentSearch("")
    setCurrentOrderby(ORDERBY_ASC)
    cleanPagination()
    getList(PAGINATION_PAGE_START, [])
    inputSearch.current.focus()
  }

  useEffect(() => {
    getList(PAGINATION_PAGE_START, [])
    return () => {
      TextilService.cancelPetition()
    }
  }, [])

  useEffect(() => {
    if (list.length !== 0) {
      getList(pagination.pageIndex)
    }
  }, [currentOrderby])

  useEffect(() => {
    setRecentSearch(currentSearch)
  }, [loading])

  return (
    <Wrapper className="pb-8">
      <Header $backgroundColor={THEME_COLOR_CONFIGURATIONS}>
        <div className="flex gap-2">
          <PersonLockFilled
            color={THEME_COLOR_CONFIGURATIONS}
            style={{ width: 48, height: 48 }}
          />
          <HeaderList
            title="Usuarios"
            loading={loading}
            recentSearch={recentSearch}
            resultCount={pagination.resultCount}
            theme={{
              COLOR_TITLE: THEME_COLOR_CONFIGURATIONS,
              COLOR_SUBTITLE: "#FFF",
            }}
          ></HeaderList>
        </div>
        <NavLink to="./nuevo">
          <ButtonPrimary
            style={{
              background: THEME_COLOR_CONFIGURATIONS,
              color: THEME_TEXT_CONFIGURATIONS,
            }}
          >
            <AddCircle24Filled />
            Agregar Usuario
          </ButtonPrimary>
        </NavLink>
      </Header>
      <Content>
        <SubContent $align="flex-start">
          <Label>Buscar: {currentSearch}</Label>
          <SubContent $align="flex-start" $direction="row">
            <Input
              defaultValue={currentSearch}
              value={currentSearch}
              onChange={(e) => {
                setCurrentSearch(e.target.value)
              }}
              onKeyUp={onSearch}
              contentAfter={<Search24Filled />}
              ref={inputSearch}
            />
            <Button
              appearance="outline"
              onClick={() => {
                getList(PAGINATION_PAGE_START)
              }}
            >
              Buscar
            </Button>
            <Button
              appearance="subtle"
              icon={<ArrowClockwise24Filled />}
              onClick={onReset}
            />
            <Switch
              checked={currentOrderby !== ORDERBY_ASC}
              onChange={onOrderbyChange}
              label={
                currentOrderby !== ORDERBY_ASC ? "Descendente" : "Ascendente"
              }
            />
          </SubContent>
        </SubContent>
      </Content>
      <Content>
        <SubContent $align="flex-start" $paddingY={16}>
          <TextTitle $size={20} $color="#fff" className="font-light">
            {loading ? (
              <>
                Esperando
                <DotAnimation $delay="500ms">.</DotAnimation>
                <DotAnimation $delay="600ms">.</DotAnimation>
                <DotAnimation $delay="700ms">.</DotAnimation>
              </>
            ) : (
              <>
                Página {pagination.pageIndex}/{pagination.pageCount}
              </>
            )}
          </TextTitle>
        </SubContent>
        {loading ? (
          <SubContent>
            <TableSkeleton
              cols={columns.length}
              rows={PAGINATION_LIMIT_DEFAULT}
            ></TableSkeleton>
          </SubContent>
        ) : (
          <>
            {list.length === 0 ? (
              <SubContent>
                <TextSubTitle $color="#fff">{message}</TextSubTitle>
                <Button
                  appearance="primary"
                  size="large"
                  icon={<ArrowClockwise24Filled />}
                  onClick={() => {
                    if (pagination.pageIndex !== 0) {
                      getList(pagination.pageIndex)
                    } else {
                      getList(PAGINATION_PAGE_START, [])
                    }
                  }}
                >
                  Recargar
                </Button>
              </SubContent>
            ) : (
              <>
                <Table arial-label="Lista">
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey}>
                          {column.label}
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {list.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <TableCellLayout media={<PersonFilled />}>
                            {item.username}
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.rol}</TableCellLayout>
                        </TableCell>
                        <TableCell>{formattedData(item.created_at)}</TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <NavLink to={`./${item.id}`}>
                              <Button
                                icon={<EditRegular />}
                                aria-label="Edit"
                              />
                            </NavLink>
                          </TableCellLayout>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Separator height={20} />
                <Pagination
                  pageCount={pagination.pageCount}
                  selectedPage={pagination.pageIndex}
                  selectedBackColor={THEME_COLOR_CONFIGURATIONS}
                  selectedTextColor={THEME_TEXT_CONFIGURATIONS}
                  onPageChange={onPageChange}
                ></Pagination>
              </>
            )}
          </>
        )}
      </Content>
    </Wrapper>
  )
}
