import PropTypes, { string } from "prop-types"
import { Search24Filled } from "@fluentui/react-icons"
import { SubContent, TextSubTitle, TextTitle, DotAnimation } from "./styles"

const HeaderList = ({
  title,
  resultCount,
  recentSearch,
  loading,
  theme,
  showSearchIcon,
}) => (
  <>
    {resultCount > 0 ? (
      <>
        <SubContent $align="center" $direction="row" $paddingY={8}>
          {recentSearch !== "" && showSearchIcon && (
            <Search24Filled
              style={{
                width: "40px",
                height: "40px",
                color: theme?.COLOR_TITLE,
              }}
            />
          )}
          <SubContent $align="flex-start">
            <TextTitle $color={theme?.COLOR_TITLE}>
              {recentSearch !== "" ? (
                <span>{recentSearch}</span>
              ) : (
                <span>{title}</span>
              )}
            </TextTitle>
            <TextSubTitle $color={theme?.COLOR_SUBTITLE}>
              {recentSearch !== "" ? (
                <span>
                  {resultCount} {`resultado${resultCount > 1 ? "s" : ""}`}
                </span>
              ) : (
                <span>{resultCount} encontrados</span>
              )}
            </TextSubTitle>
          </SubContent>
        </SubContent>
      </>
    ) : (
      <>
        <SubContent $align="flex-start" $paddingY={8}>
          <TextTitle $color={theme?.COLOR_TITLE}>{title}</TextTitle>
          {loading ? (
            <TextSubTitle $color={theme?.COLOR_SUBTITLE}>
              Cargando
              <DotAnimation $delay="500ms">.</DotAnimation>
              <DotAnimation $delay="600ms">.</DotAnimation>
              <DotAnimation $delay="700ms">.</DotAnimation>
            </TextSubTitle>
          ) : (
            <TextSubTitle $color={theme?.COLOR_SUBTITLE}>
              <span>No hay resultados</span>
            </TextSubTitle>
          )}
        </SubContent>
      </>
    )}
  </>
)

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  resultCount: PropTypes.number.isRequired,
  recentSearch: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  theme: PropTypes.shape({
    COLOR_TITLE: string,
    COLOR_SUBTITLE: string,
  }).isRequired,
  showSearchIcon: PropTypes.bool,
}

HeaderList.defaultProps = {
  showSearchIcon: true,
}

export default HeaderList
