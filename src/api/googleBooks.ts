import { jsonFetch } from 'src/utils/jsonFetch';

const APYkey = import.meta.env.VITE_APY_KEY || '';

export type VolumeApi = {
  etag: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors?: string[];
    categories?: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail?: string;
    };
  };
};

export type GetVolumesApi = {
  kind: string;
  totalItems: number;
  items?: VolumeApi[];
};

async function getVolumes(query: string): Promise<GetVolumesApi> {
  return jsonFetch(`https://www.googleapis.com/books/v1/volumes?${query}&key=${APYkey}`);
}

export const googleBooks = {
  getVolumes,
};
