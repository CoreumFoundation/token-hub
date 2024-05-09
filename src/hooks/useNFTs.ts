import { fetchIssuedNFTCollectionsByAccount, fetchNFTsByOwnerAndClass } from "@/features/nft/nftSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export const useNFTs = () => {
  const network = useAppSelector(state => state.general.network);
  const account = useAppSelector(state => state.general.account);
  const isConnected = useAppSelector(state => state.general.isConnected);
  const nftCollections = useAppSelector(state => state.nfts.collections);
  const isFetched = useAppSelector(state => state.nfts.isFetched);

  const isNFTItemsFetched = useAppSelector(state => state.nfts.isNFTItemsFetched);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetched && account) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));
    }
  }, [account, nftCollections, isConnected, isFetched, network]);

  useEffect(() => {
    if (account) {
      dispatch(fetchIssuedNFTCollectionsByAccount({ account, network }));
    }
  }, [network, account]);

  useEffect(() => {
    if (!isNFTItemsFetched && account && nftCollections.length) {
      for (const collection of nftCollections) {
        dispatch(fetchNFTsByOwnerAndClass({
          account,
          network,
          classId: collection.id,
        }));
      }
    }
  }, [account, isNFTItemsFetched, network, nftCollections]);
};