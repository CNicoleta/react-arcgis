import PageTemplate from "components/common/PageTemplate";
import CoreCard from "components/core/CoreCard";
import { cards } from "utils/constants/homePage";

const HomePage = () => {
  return (
    <PageTemplate title="Home">
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {cards.map((card) => (
          <CoreCard key={card.id}>{card.content}</CoreCard>
        ))}
      </div>
    </PageTemplate>
  );
};

export default HomePage;
