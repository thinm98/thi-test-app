import { openMiniApp } from "zmp-sdk";
import { Box, Button, Icon, Page, Text } from "zmp-ui";

import Clock from "@/components/clock";
import Logo from "@/components/logo";
import bg from "@/static/bg.svg";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/api/products";

function HomePage() {
  const [count, setCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Page
      className="flex flex-col items-center justify-center space-y-6 bg-cover bg-center bg-no-repeat bg-white dark:bg-black"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <Box></Box>
      <Box textAlign="center" className="space-y-1">
        <Text.Title size="xLarge">Hello world!</Text.Title>
        <Clock />
      </Box>
      <Button
        variant="primary"
        suffixIcon={<Icon icon="zi-more-grid" />}
        onClick={() => {
         setCount((prev)=> prev + 1)
        }}
      >
        {count}
      </Button>
      {/* Product List Section */}
      <Box className="w-full max-w-md mt-4">
        <Text.Title size="large">Product List</Text.Title>
        {loading && <Text>Loading products...</Text>}
        {error && <Text color="danger">{error}</Text>}
        {!loading && !error && products.length === 0 && (
          <Text>No products found.</Text>
        )}
        {!loading && !error && products.length > 0 && (
          <Box as="ul" className="space-y-2">
            {products.map((product: any) => (
              <Box as="li" key={product.id} className="p-2 border rounded">
                <Text>{product.name}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Logo className="fixed bottom-8" />
    </Page>
  );
}

export default HomePage;
