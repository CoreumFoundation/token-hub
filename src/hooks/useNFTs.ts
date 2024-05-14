import { shouldRefetchCurrencies } from '@/features/currencies/currenciesSlice';
import { fetchIssuedNFTCollectionsByAccount, fetchNFTsByOwnerAndClass, setShouldFetchNFTCollections, setShouldRefetchNFTItems } from "@/features/nft/nftSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useNFTs = () => {
  const network = useAppSelector(state => state.general.network);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const nftCollections = useAppSelector(state => state.nfts.collections);
  const isFetched = useAppSelector(state => state.nfts.isFetched);
  const isNFTItemsFetched = useAppSelector(state => state.nfts.isNFTItemsFetched);

  const shouldRefetchCollections = useAppSelector(state => state.nfts.shouldRefetchCollections);
  const shouldRefetchNFTItems = useAppSelector(state => state.nfts.shouldRefetchNFTItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (account && (!isFetched || shouldRefetchCollections)) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));

      if (shouldRefetchCollections) {
        dispatch(setShouldFetchNFTCollections(false));
      }
    }
  }, [account, nftCollections, isConnected, isFetched, network, shouldRefetchCollections]);

  useEffect(() => {
    if (account) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));
    }
  }, [network, account]);

  useEffect(() => {
    if (account && nftCollections.length && (!isNFTItemsFetched || shouldRefetchNFTItems)) {
      for (const collection of nftCollections) {
        dispatch(fetchNFTsByOwnerAndClass({
          network,
          classId: collection.id,
        }));
      }

      if (shouldRefetchNFTItems) {
        dispatch(setShouldRefetchNFTItems(false));
      }
    }
  }, [account, isNFTItemsFetched, network, nftCollections, shouldRefetchNFTItems]);
};
