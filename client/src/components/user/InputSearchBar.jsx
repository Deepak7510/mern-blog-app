import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useFetch from "@/helpers/useFetch";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchBlogTile from "./SearchBlogTile";

const InputSearchBar = () => {
  const [openSearchListSheet, setOpenSearchListSheet] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (searchValue.trim().length > 0) {
      setOpenSearchListSheet(true);
      setQuery(searchValue);
    }
  }

  const { data: blogSearchList, loading: searchLoading } = useFetch(
    query.length > 0
      ? `${import.meta.env.VITE_BACKEND_URL}/api/blogs/search?input=${query}`
      : null,
    {},
    [query]
  );

  return (
    <div>
      <Sheet open={openSearchListSheet} onOpenChange={setOpenSearchListSheet}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Search Result: {query}</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full rounded-md border p-2">
            {searchLoading && <p className="mt-4">Loading...</p>}

            {!searchLoading && blogSearchList?.length > 0
              ? blogSearchList.map((item, index) => (
                  <SearchBlogTile
                    key={index}
                    setOpenSearchListSheet={setOpenSearchListSheet}
                    blogDetails={item}
                  />
                ))
              : !searchLoading &&
                query && <p className="mt-4 text-muted">No results found.</p>}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <form onSubmit={handleSubmit} className="w-full">
        <Input
          type="text"
          name="search"
          className="w-full md:w-80 rounded-full"
          placeholder="Search"
        />
      </form>
    </div>
  );
};

export default InputSearchBar;
