import { StyleSheet, Dimensions, PixelRatio, Platform } from "react-native";
export const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export function normalize(size) {
  const newSize = (size * width) / guidelineBaseWidth;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export { scale, verticalScale, moderateScale };

export const Metrics = {
  screenWidth: Dimensions.get("screen").width,
  screenHeight: Dimensions.get("screen").height
};

export const colors = {
  BLUE: "#597ff5",
  BLUE_V2: "#61b0fe",
  DARK_BLUE: "#4f72df",
  SOFT_BLUE: "#61b0fe",
  GREY: "#858585",
  SOFT_GREY: "#e5e5e5",
  DARK_GREY: "#555555",
  LIL_GREY: "#f9f9f9",
  LIL_GREY_V2: "#f6f6f6",
  SOFT_RED: "#fa7d77"
};

const globalStyles = StyleSheet.create({
  errorWrapper: {
    color: "#f52740",
    fontSize: normalize(12)
  },
  font: {
    fontFamily: "Nunito-Regular"
  },
  rowBetween: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default globalStyles;
