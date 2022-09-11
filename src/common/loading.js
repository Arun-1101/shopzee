import AnimatedLottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
const Loading = () => {
    return (
            <View style={{height:"100%",alignItems:'center'}}>
                <AnimatedLottieView source={require("../assets/86697-wave-loading-animation-websiteapp-loader.json")}
                    speed={1}
                    style={{ backgroundColor:'rgba(52, 52, 52, 0.0)',height:"100%"}}
                    autoSize={true}
                    autoPlay={true}
                />
            </View>
    );
}
export default Loading