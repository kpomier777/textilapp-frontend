/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  ArrowClockwise24Filled,
  AddCircle24Filled,
  Search24Filled,
  EditRegular,
  DeleteRegular,
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
import { setThemeFlow } from "@/redux/actionCreators"
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
  THEME_COLOR_OPERATORS,
  THEME_TEXT_OPERATORS,
} from "@/config/theme-color"
import { ENTITY_OCCUPATIONS } from "@/config/entities"

const columns = [
  { columnKey: "occupationId", label: "#" },
  { columnKey: "occupationName", label: "Ocupación" },
  { columnKey: "turnName", label: "Turno" },
  { columnKey: "turnStartTime", label: "Entrada" },
  { columnKey: "turnEndTime", label: "Salida" },
  { columnKey: "createdAt", label: "Creado" },
  { columnKey: "updatedAt", label: "Actualizado" },
  { columnKey: "action", label: "Acciones" },
]

moment.locale("es")

export default function TurnList() {
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
  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.userAuth)

  TextilService.setAuthorization(token)
  TextilService.setEntity(ENTITY_OCCUPATIONS)

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
    dispatch(
      setThemeFlow({
        color: THEME_COLOR_OPERATORS,
      })
    )
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
      <Header $backgroundColor={THEME_COLOR_OPERATORS}>
        <HeaderList
          title="Ocupaciones"
          loading={loading}
          recentSearch={recentSearch}
          resultCount={pagination.resultCount}
          theme={{
            COLOR_TITLE: THEME_COLOR_OPERATORS,
            COLOR_SUBTITLE: "#FFF",
          }}
        ></HeaderList>
        <NavLink to="./nuevo">
          <ButtonPrimary
            style={{
              background: THEME_COLOR_OPERATORS,
              color: THEME_TEXT_OPERATORS,
            }}
          >
            <AddCircle24Filled />
            Agregar Ocupación
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
                      {columns.map((column, indexColumn) => (
                        <TableHeaderCell
                          key={column.columnKey}
                          style={{
                            width: `${indexColumn === 0 && "30px"}`,
                          }}
                        >
                          {column.label}
                        </TableHeaderCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {list.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <TableCellLayout>{item.id}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.name}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.turnName}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.start_time}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.end_time}</TableCellLayout>
                        </TableCell>
                        <TableCell>{formattedData(item.created_at)}</TableCell>
                        <TableCell>
                          <TableCellLayout>
                            {formattedData(item.updated_at)}
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <NavLink to={`./${item.id}`}>
                              <Button
                                icon={<EditRegular />}
                                aria-label="Edit"
                              />
                            </NavLink>
                            <Separator inline width={8} />
                            <Button
                              icon={<DeleteRegular />}
                              aria-label="Delete"
                            />
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
                  selectedBackColor={THEME_COLOR_OPERATORS}
                  selectedTextColor={THEME_TEXT_OPERATORS}
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
