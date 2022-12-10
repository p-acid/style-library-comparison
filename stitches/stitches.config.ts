import { createStitches } from "@stitches/react";

export const { styled, createTheme, getCssText } = createStitches({
  /**
   * 테마 데이터
   */
  theme: {
    fonts: {
      system: "system-ui",
    },
    colors: {
      hiContrast: "hsl(206,10%,5%)",
      loContrast: "white",
    },
    fontSizes: {
      1: "13px",
      2: "15px",
      3: "17px",
    },
  },
  /**
   * 반응형 (미디어 쿼리)
   */
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
    toBp2: "(width <= 768px)",
  },
  /**
   * 커스텀 스타일 유틸
   */
  utils: {
    size: (value: number) => ({
      width: value,
      height: value,
    }),
    linearGradient: (value: string) => ({
      backgroundImage: `linear-gradient(${value})`,
    }),
    bg: (value: string | number) => ({
      backgroundColor: value,
    }),
  },
  /**
   * 전역 충돌을 피하기 위한 클래스명 접두사
   */
  // prefix: "radix",
  /**
   * 테마 토큰에 대한 CSS 요소 매핑
   */
  themeMap: {
    width: "space",
    height: "space",
  },
});
