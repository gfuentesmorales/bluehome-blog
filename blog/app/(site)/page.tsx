import Container from "./components/Contaier";
import FeaturedPost from "./components/Feature";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Search from "./components/Search";
import Section from "./components/Section";



export default async function Home() {

  return (
    <Container>
      <Section>
        <Search />
      </Section>

      <Section>
        <FeaturedPost />
      </Section>

      <Section>
        <Posts />
      </Section>
    </Container>
  );
}
