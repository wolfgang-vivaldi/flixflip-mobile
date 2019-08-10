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
  PRIMARY: "#f2af09",
  BLACK: "#0e0e0e"
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
