import React from 'react';

const DiscoContext = React.createContext();
const DiscoProvider = DiscoContext.Provider;
const DiscoConsumer = DiscoContext.Consumer;

export {DiscoProvider, DiscoConsumer};