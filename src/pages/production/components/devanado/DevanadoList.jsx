/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  ArrowClockwise24Filled,
  AddCircle24Filled,
  Search24Filled,
  EditRegular,
  DeleteRegular,
  HexagonThreeFilled,
  DocumentPageNumber24Regular,
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
  Tooltip,
} from "@fluentui/react-components"

import { toast } from "sonner"
import moment from "moment"
// import HeaderList from "./HeaderList"
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
  THEME_COLOR_PRODUCTIONS,
  THEME_TEXT_PRODUCTIONS,
} from "@/config/theme-color"
import { ENTITY_DEVANADO } from "@/config/entities"
import ModalManager from "../ModalManager"

const columns = [
  { columnKey: "productDevanadoId", label: "#" },
  { columnKey: "productLote", label: "Producto Lote" },
  { columnKey: "productKilosNeto", label: "Peso Neto [kg]" },
  { columnKey: "productDevanadoOperator", label: "Operador" },
  { columnKey: "productDevanadoClient", label: "Cliente" },
  { columnKey: "productColor", label: "Color" },
  { columnKey: "productTitulo", label: "Titulo" },
  { columnKey: "action", label: "Acciones" },
]

moment.locale("es")

export default function ProductDevanadoList() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const modalView = searchParams.get("view")
  const modalViewId = searchParams.get("id")

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
  TextilService.setEntity(ENTITY_DEVANADO)

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
      <Header
        style={{ flexDirection: "column", gap: "1rem" }}
        $backgroundColor={THEME_COLOR_PRODUCTIONS}
      >
        <div className="w-full flex justify-start gap-8">
          <div className="flex gap-2">
            <HexagonThreeFilled
              color={THEME_COLOR_PRODUCTIONS}
              style={{ width: 48, height: 48 }}
            ></HexagonThreeFilled>
            <HeaderList
              title="Devanado"
              loading={loading}
              recentSearch={recentSearch}
              resultCount={pagination.resultCount}
              theme={{
                COLOR_TITLE: THEME_COLOR_PRODUCTIONS,
                COLOR_SUBTITLE: "#FFF",
              }}
              showSearchIcon={false}
            ></HeaderList>
          </div>
          <NavLink to="./nuevo">
            <ButtonPrimary
              style={{
                background: THEME_COLOR_PRODUCTIONS,
                color: THEME_TEXT_PRODUCTIONS,
              }}
            >
              <AddCircle24Filled />
              Agregar Devanado
            </ButtonPrimary>
          </NavLink>
        </div>
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
                          <TableCellLayout
                            media={<DocumentPageNumber24Regular />}
                          >
                            <Tooltip
                              content={`${item.productName}`}
                              relationship="label"
                            >
                              <NavLink
                                to={`.?view=productos&id=${item.productId}`}
                                className="underline text-blue-500"
                              >
                                {item.productLote}
                              </NavLink>
                            </Tooltip>
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{`${item.kilos_neto}`}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <Tooltip
                              content={`${item.operatorFirstName} ${item.operatorLastName}`}
                              relationship="label"
                            >
                              <NavLink
                                to={`.?view=operadores&id=${item.operatorId}`}
                                className="underline text-blue-500"
                              >
                                {item.operatorCod}
                              </NavLink>
                            </Tooltip>
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>
                            <Tooltip
                              content={`${item.clientFirstName} ${item.clientLastName}`}
                              relationship="label"
                            >
                              <NavLink
                                to={`.?view=clientes&id=${item.clientId}`}
                                className="underline text-blue-500"
                              >
                                {item.clientCod}
                              </NavLink>
                            </Tooltip>
                          </TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.colorName}</TableCellLayout>
                        </TableCell>
                        <TableCell>
                          <TableCellLayout>{item.titleCod}</TableCellLayout>
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
                  selectedBackColor={THEME_COLOR_PRODUCTIONS}
                  selectedTextColor={THEME_TEXT_PRODUCTIONS}
                  onPageChange={onPageChange}
                ></Pagination>
              </>
            )}
          </>
        )}
      </Content>

      <ModalManager modalView={modalView} modalViewId={modalViewId} />
    </Wrapper>
  )
}
