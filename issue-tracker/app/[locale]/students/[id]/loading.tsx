import {
  Avatar,
  Box,
  Card,
  Flex,
  Grid,
  Separator,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingStudentDetailPage = () => {
  return (
    <Box className="max-w-xl">
      {" "}
      <Card size="3" className="max-w-md-full">
        <Flex gap="4" align="center">
          <Avatar
            size="5"
            radius="full"
            fallback={<Skeleton height="2rem" width="2rem" />}
            color="indigo"
          />
          <Box>
            <Flex gap="1" align="center">
              <Text size="5">First name:</Text>
              <Skeleton width="8rem" />
            </Flex>
            <Flex gap="1" align="center">
              <Text size="5"> Last name: </Text>
              <Skeleton width="8rem" />
            </Flex>

            <Skeleton width="10rem" />
            <Skeleton width="5rem" />

            <Grid columns={{ initial: "1", sm: "2" }} gap="1" align="center">
              <Flex gap="1" align="center">
                <Text color="blue">Created at </Text>
                <Skeleton width="8rem" />
                <Separator orientation="vertical" />
              </Flex>
              <Flex gap="1" align="center">
                <Text color="green">Updated at </Text>
                <Skeleton width="8rem" />
              </Flex>
            </Grid>
          </Box>
        </Flex>
      </Card>
    </Box>
  );
};

export default LoadingStudentDetailPage;
