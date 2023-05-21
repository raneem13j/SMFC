import React, { useState } from "react";

const Filtertag = () => {
 
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  

  const Decks = [
    {
      id: 1,
      topic: "math",
      category: "entertainment",
      subCategory: "Aljabra1",
      name: "Football1",
    },
    {
      id: 2,
      topic: "math",
      category: "test",
      subCategory: "testx",
      name: "Football2",
    },
    {
      id: 3,
      topic: "sport",
      category: "test2",
      subCategory: "testy",
      name: "Football3",
    },
    {
      id: 4,
      topic: "physics",
      category: "test6",
      subCategory: "testz",
      name: "Football4",
    },
    {
      id: 5,
      topic: "art",
      category: "test3",
      subCategory: "testd",
      name: "Football5",
    },
    {
      id: 6,
      topic: "art",
      category: "test7",
      subCategory: "testc",
      name: "Football6",
    },
    {
      id: 7,
      topic: "math",
      category: "entertainment",
      subCategory: "Aljabra",
      name: "Football7",
    },
  ];
  const topics = [
    { id:1, topic: "math" },
    {id:2, topic: "sport" },
    {id:3, topic: "physics" },
    {id:4, topic: "art" },
  ];
  const categorise = [
    {id:1, category: "entertainment", topic_id:1 },
    {id:2, category: "test",topic_id:1 },
    {id:3, category: "test2",topic_id:2 },
    {id:4, category: "test6",topic_id:3 },
    {id:5, category: "test3",topic_id:4 },
    {id:6, category: "test7",topic_id:4 },
  ];

  const subCategorise = [
    { subCategory: "testx", category_id:2 },
    { subCategory: "Aljabra1", category_id:1  },
    { subCategory: "testy" , category_id:3 },
    { subCategory: "testz", category_id:4  },
    { subCategory: "testd", category_id:5 },
    { subCategory: "testc", category_id:6 },
    { subCategory: "Aljabra", category_id:1  },
  ];
  const [filteredDecks, setFilteredDecks] = useState(Decks);
  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  
    const filteredDecksByTopic = Decks.filter(
      (deck) => deck.topic === topics.find((t) => t.id === topicId).topic
    );
    setFilteredDecks(filteredDecksByTopic);
  };
  const handleCategorySelect = (categoryId, topicId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedTopic(topicId);
  
    const filteredDecksByCategory = Decks.filter(
      (deck) =>
        deck.category === categorise.find((c) => c.id === categoryId).category &&
        deck.topic === topics.find((t) => t.id === topicId).topic
    );
    setFilteredDecks(filteredDecksByCategory);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  
    const filteredDecksBySubcategory = Decks.filter(
      (deck) =>
        deck.subCategory === subcategory &&
        deck.category === categorise.find((c) => c.id === selectedCategory).category &&
        deck.topic === topics.find((t) => t.id === selectedTopic).topic
    );
    setFilteredDecks(filteredDecksBySubcategory);
  };
const filteredCategories = categorise.filter(
  (category) => category.topic_id === selectedTopic
);

const filteredSubcategories = subCategorise.filter(
  (subcategory) => subcategory.category_id === selectedCategory
);



const topicOptions = topics.map((topic) => (
  <li key={topic.id} onClick={() => handleTopicSelect(topic.id)}>
    {topic.topic}
  </li>
));

const categoryOptions = filteredCategories.map((category) => (
  <li key={category.id} onClick={() => handleCategorySelect(category.id, category.topic_id)}>
    {category.category}
  </li>
));

const subcategoryOptions = filteredSubcategories.map((subcategory) => (
  <li
    key={subcategory.subCategory}
    onClick={() => handleSubcategorySelect(subcategory.subCategory)}
  >
    {subcategory.subCategory}
  </li>
));

  return (
    <div>
      <div className="H-filter">
        <div className="filter-section">
          {/* a map of topics go here */}
          <ul className="filter-list">
          {topicOptions}
            
          </ul>
        </div>
        <div className="filter-section">
          {/* a map of categories go here */}
          <ul className="filter-list">
          {categoryOptions}
          </ul>
        </div>
        <div className="filter-section">
          {/* a map of subcategories go here */}
          <ul className="filter-list">
          {subcategoryOptions}
          </ul>
        </div>
      </div>
      {/* a map of decks go here */}
      <div className="decks-list">
      <h2>Filtered Decks:</h2>
      {filteredDecks.map(deck => <div key={deck.id}>{deck.name}</div>)}
      </div>
    </div>
  );
};

export default Filtertag;
