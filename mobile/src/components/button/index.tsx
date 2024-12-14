import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  TextProps,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { colors } from "@/styles/theme";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";


type ButtonProps = TouchableOpacityProps & {
  isloading?: boolean;
};
type IconProps = {
  icon: React.ComponentType<TablerIconProps>;
};

function Button({ children, style, isloading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      disabled={isloading}
      {...rest}
    >
      {isloading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

function Title({ children }: TextProps) {
  return <Text style={styles.title}>{children}</Text>;
}

function Icon({icon: Icon}: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title;
Button.Icon = Icon;

export { Button };
