import {
  Body,
  Container,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

export default function WelcomTemplate({ name }: { name: string }) {
  return (
    <Html>
      <Preview>Welcome Aboard</Preview>
      <Tailwind>
        <Body className="bg-slate-300">
          <Container>
            <Text>Heloow {name} NEXT Test App!!</Text>
            <Link href="https://digitalprintna.com">Digital Print NA</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
