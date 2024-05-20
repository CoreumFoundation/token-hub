import {
  fetchIssuedNFTCollectionsByAccount,
  fetchNFTsByOwnerAndClass,
  setNFTItems,
  setShouldFetchNFTCollections,
  setShouldRefetchNFTItems,
} from "@/features/nft/nftSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useNFTs = () => {
  const network = useAppSelector(state => state.general.network);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const nftCollections = useAppSelector(state => state.nfts.collections);
  const isFetched = useAppSelector(state => state.nfts.isFetched);

  const isLoading = useAppSelector(state => state.nfts.isLoading);

  const shouldRefetchCollections = useAppSelector(state => state.nfts.shouldRefetchCollections);
  const shouldRefetchNFTItems = useAppSelector(state => state.nfts.shouldRefetchNFTItems);

  const selectedNFTClass = useAppSelector(state => state.nfts.selectedNFTClass);
  const nftItems = useAppSelector(state => state.nfts.nftItems);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (account) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));
    }
  }, [network, account]);

  useEffect(() => {
    if (account && !isLoading && (!isFetched || shouldRefetchCollections)) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));

      if (shouldRefetchCollections) {
        dispatch(setShouldFetchNFTCollections(false));
      }
    }
  }, [account, nftCollections, isConnected, isFetched, network, shouldRefetchCollections, isLoading]);

  useEffect(() => {
    if (selectedNFTClass) {
      dispatch(fetchNFTsByOwnerAndClass({
        account,
        network,
        classId: selectedNFTClass.id,
      }));
    }
  }, [account, network, selectedNFTClass]);

  useEffect(() => {
    if (shouldRefetchNFTItems) {
      if (Object.keys(nftItems).length) {
        dispatch(setNFTItems({}));
      }
      dispatch(setShouldRefetchNFTItems(false));
    }
  }, [shouldRefetchNFTItems, nftItems]);
};
