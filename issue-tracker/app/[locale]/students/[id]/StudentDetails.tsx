import { Student } from "@prisma/client";
import {
  Card,
  Flex,
  Avatar,
  Box,
  Text,
  Separator,
  Grid,
} from "@radix-ui/themes";
import {
  formatDateString,
  formatDateToString,
} from "@/app/[locale]/thesis/_components/DateFormatter";
import { useTranslate } from "@/app/Translations";

const StudentDetails = ({ student }: { student: Student }) => {
  const translations = {
    firstname: useTranslate("students.id.studentDetails.firstname"),
    lastname: useTranslate("students.id.studentDetails.lastname"),
    createdAt: useTranslate("students.id.studentDetails.createdAt"),
    updatedAt: useTranslate("students.id.studentDetails.updatedAt"),
  };
  const { firstname, lastname, createdAt, updatedAt } = translations;
  return (
    <div>
      {" "}
      <Card size="3" className="max-w-sm-full">
        <Flex gap="4" align="center">
          <Avatar
            size="5"
            radius="full"
            fallback={getInitials(`${student.firstName} ${student.lastName}`)}
            color="indigo"
          />
          <Box>
            <Flex gap="1">
              <Text size="5">{`${firstname}:`}</Text>
              <Text as="span" size="5" weight="bold">
                {" " + student.firstName}
              </Text>
            </Flex>
            <Flex gap="1">
              <Text size="5">{`${lastname}:`}</Text>
              <Text as="span" size="5" weight="bold">
                {" " + student.lastName}
              </Text>
            </Flex>

            <Text as="div" size="3" color="gray">
              {student.email}
            </Text>
            <Text as="div" size="2" color="teal">
              {student.matrikel}
            </Text>
            <Grid columns={{ initial: "1", sm: "2" }} gap="1" align="center">
              <Flex gap="1" align="center">
                <Text color="blue">{`${createdAt}:`}</Text>
                <Text>
                  {formatDateToString(
                    new Date(student.createdAt).toDateString()
                  )}
                </Text>
                <Separator orientation="vertical" />
              </Flex>
              <Flex gap="1" align="center">
                <Text color="green">{`${updatedAt}:`}</Text>
                <Text>
                  {formatDateToString(
                    new Date(student.updatedAt).toDateString()
                  )}
                </Text>
              </Flex>
            </Grid>
          </Box>
        </Flex>
      </Card>
    </div>
  );
};
function getInitials(name: string) {
  // Split the name into words
  const words = name.split(" ");
  // Get the first letter of each word and join them
  const initials = words.map((word) => word.charAt(0)).join("");
  return initials;
}
export default StudentDetails;
