import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [goldRates, setGoldRates] = useState(null);
  const [homeContent, setHomeContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [prods, cats, cols, rates, home] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getCollections(),
        api.getGoldRates(),
        api.getHomeContent()
      ]);
      setProducts(prods);
      setCategories(cats);
      setCollections(cols);
      setGoldRates(rates);
      setHomeContent(home);
    } catch (err) {
      console.error('Error fetching global data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <DataContext.Provider value={{
      products,
      categories,
      collections,
      goldRates,
      homeContent,
      loading,
      refreshData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
