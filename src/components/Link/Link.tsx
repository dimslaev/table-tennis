import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import {
  Link as RadixLink,
  LinkProps as RadixLinkProps,
} from "@radix-ui/themes";

type Props = RadixLinkProps & {
  routerLinkProps?: Omit<RouterLinkProps, "to">;
};

export const Link = (props: Props) => {
  const { routerLinkProps, ...radixLinkProps } = props;
  const { children } = radixLinkProps;

  return (
    <RadixLink {...radixLinkProps} asChild>
      <RouterLink to={radixLinkProps.href || ""} {...routerLinkProps}>
        {children}
      </RouterLink>
    </RadixLink>
  );
};
