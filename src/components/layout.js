import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex
      sx={{ backgroundColor: "#0f0f0f" }}
      w="100vw"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
};

export default Layout;
