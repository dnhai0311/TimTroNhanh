import React, { useEffect, useRef, useState } from 'react';
import Post from '../../../components/Post';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { createSearchParams, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import './ListPost.scss';
import icons from '../../../utils/icons';
import { apiGetAllLikedPost, apiGetPosts } from '../../../services/post';

const ListPost = ({ categoryCode }) => {
    const { isDarkMode } = useSelector((state) => state.theme);
    const { userData } = useSelector((state) => state.user);
    const { RiSortAsc, RiSortDesc } = icons;

    const location = useLocation();
    const titleListRef = useRef();
    const [currentPage, setCurrentPage] = useState(0);
    const [sortedBy, setSortedBy] = useState('updatedAt');
    const [orderBy, setOrderBy] = useState('asc');

    const [priceRange, setPriceRange] = useState({ min: '0', max: '9999' });
    const [acreageRange, setAcreageRange] = useState({ min: '0', max: '9999' });
    const [districtId, setDistrictId] = useState('');
    const [provinceId, setProvinceId] = useState('');
    const [showPage, setShowPage] = useState('4');

    const [posts, setPosts] = useState();
    const [total, setTotal] = useState(0);

    const [likedPosts, setLikedPosts] = useState();

    const pageDisplayed = process.env.REACT_APP_PAGE_DISPLAYED;
    const totalPage =
        total % pageDisplayed < 1 ? Math.floor(total / pageDisplayed) : Math.floor(total / pageDisplayed) + 1;

    const scrollToTitle = () => {
        titleListRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 500) {
                setShowPage('4');
            } else {
                setShowPage('2');
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleResize);
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleResize);
            }
        };
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const pageParam = queryParams.get('page');
        const districtParam = queryParams.get('districtId');
        const provinceParam = queryParams.get('provinceId');
        const minPriceParam = queryParams.get('minPrice');
        const maxPriceParam = queryParams.get('maxPrice');
        const minAcreageParam = queryParams.get('minAcreage');
        const maxAcreageParam = queryParams.get('maxAcreage');
        const selectedPage = +pageParam - 1 >= 0 ? +pageParam - 1 : 0;
        setCurrentPage(selectedPage);
        if (districtParam) {
            setDistrictId(districtParam);
        } else {
            setDistrictId('');
        }
        if (provinceParam) {
            setProvinceId(provinceParam);
        } else {
            setProvinceId('');
        }
        if (minPriceParam && maxPriceParam) {
            setPriceRange({ min: minPriceParam, max: maxPriceParam });
        } else {
            setPriceRange({ min: '0', max: '9999' });
        }
        if (minAcreageParam && maxAcreageParam) {
            setAcreageRange({ min: minAcreageParam, max: maxAcreageParam });
        } else {
            setAcreageRange({ min: '0', max: '9999' });
        }
    }, [location]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await apiGetPosts(
                currentPage,
                conditions,
                sortedBy,
                orderBy,
                districtId,
                provinceId,
                priceRange.min,
                priceRange.max,
                acreageRange.min,
                acreageRange.max,
            );
            setPosts(response.data.response.rows);
            setTotal(response.data.response.count);
        };
        const conditions = {};
        if (categoryCode) {
            conditions['categoryCode'] = categoryCode;
        }
        fetchPosts();
    }, [
        categoryCode,
        currentPage,
        sortedBy,
        orderBy,
        districtId,
        provinceId,
        priceRange.min,
        priceRange.max,
        acreageRange.min,
        acreageRange.max,
    ]);

    useEffect(() => {
        const fetchLikePosts = async () => {
            const response = await apiGetAllLikedPost();
            if (response.status === 200) {
                const likes = response.data.response.map((like) => like.postId);

                setLikedPosts(likes);
            }
        };
        userData?.id && fetchLikePosts();
    }, [userData?.id, posts]);

    useEffect(() => {
        if (!likedPosts) return;
        if (posts?.length > 0) {
            for (const post of posts) {
                if (likedPosts.includes(post.id)) {
                    post.isLiked = true;
                }
            }
        }
    }, [likedPosts, posts]);

    const handlePageClick = (e) => {
        const selectedPage = +e.selected;
        setCurrentPage(selectedPage);
        const queryParams = new URLSearchParams(window.location.search);
        const minPriceParam = queryParams.get('minPrice');
        const maxPriceParam = queryParams.get('maxPrice');
        const minAcreageParam = queryParams.get('minAcreage');
        const maxAcreageParam = queryParams.get('maxAcreage');
        const newSearchParams = createSearchParams({
            ...(minPriceParam && maxPriceParam ? { minPrice: minPriceParam, maxPrice: maxPriceParam } : {}),
            ...(minAcreageParam && maxAcreageParam ? { minAcreage: minAcreageParam, maxAcreage: maxAcreageParam } : {}),
            page: selectedPage + 1,
        }).toString();
        window.history.pushState(null, '', `${location.pathname}?${newSearchParams}`);
        scrollToTitle();
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 ListPost">
                        <div className="row border rounded">
                            <h5 ref={titleListRef} className="pt-3 pb-1 fw-bold">
                                Danh sách các bài đăng
                            </h5>
                            <h6>Tổng: {total} bài đăng</h6>
                            <div className="py-2 d-flex align-items-center flex-wrap">
                                <span className="pe-2">Sắp xếp theo: </span>
                                <div
                                    className={`sort-tab ${sortedBy === 'price' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortedBy('price');
                                    }}
                                >
                                    Giá
                                </div>
                                <div
                                    className={`sort-tab ${sortedBy === 'acreage' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortedBy('acreage');
                                    }}
                                >
                                    Diện tích
                                </div>
                                <div
                                    className={`sort-tab ${sortedBy === 'updatedAt' ? 'active' : ''}`}
                                    onClick={() => {
                                        setSortedBy('updatedAt');
                                    }}
                                >
                                    Thời gian
                                </div>
                                <div
                                    className="px-1 order-item"
                                    onClick={() => {
                                        setOrderBy((prevOrderBy) => (prevOrderBy === 'asc' ? 'desc' : 'asc'));
                                    }}
                                >
                                    {orderBy === 'asc' ? (
                                        <RiSortAsc fontSize={'25px'} />
                                    ) : (
                                        <RiSortDesc fontSize={'25px'} />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row border rounded">
                            {posts?.length > 0 &&
                                posts.map((item) => {
                                    return (
                                        <Post
                                            key={item?.id}
                                            title={item?.title}
                                            description={item?.description}
                                            star={+item?.star}
                                            price={item?.attribute.price}
                                            area={item?.attribute.acreage}
                                            location={item?.attribute.address}
                                            uploader={item?.user.name}
                                            time={item?.updatedAt}
                                            img={JSON.parse(item?.images.path)[0]}
                                            phone={item?.user.phone}
                                            id={item?.id}
                                            avatar={item?.user.avatar}
                                            isLiked={item?.isLiked}
                                        />
                                    );
                                })}
                        </div>
                        <div className="row pageTab pt-2">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={showPage}
                                marginPagesDisplayed={1}
                                pageCount={totalPage}
                                previousLabel="<"
                                pageClassName={`page-item ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
                                pageLinkClassName="page-link"
                                previousClassName={`page-item ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
                                previousLinkClassName="page-link"
                                nextClassName={`page-item ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
                                nextLinkClassName="page-link"
                                breakClassName={`page-item ${isDarkMode ? 'dark-theme' : 'light-theme'}`}
                                breakLinkClassName="page-link"
                                containerClassName="pagination justify-content-center"
                                activeClassName="active"
                                forcePage={Math.min(currentPage, totalPage - 1)}
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                    <div className="d-none d-md-block col-md-4 ps-5">
                        <Sidebar scrollFunction={scrollToTitle} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListPost;
