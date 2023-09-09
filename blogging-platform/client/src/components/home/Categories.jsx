import { Button, Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
    border-collapse: collapse;
    width: 80%;
    margin: 0 auto;
`;

const StyledTableHead = styled(TableHead)`
    background-color: #6495ED;
    color: #fff;
`;

const StyledTableRow = styled(TableRow)`
    &:nth-of-type(odd) {
        background-color: #f2f2f2;
    }
`;

const StyledTableCell = styled(TableCell)`
    padding: 10px;
    text-align: center;
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <StyledLink to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
                <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <StyledTableHead>
                    <StyledTableRow>
                        <StyledTableCell>
                            <StyledLink to={"/"}>
                                All Categories
                            </StyledLink>
                        </StyledTableCell>
                    </StyledTableRow>
                </StyledTableHead>
                <TableBody>
                    {categories.map((category) => (
                        <StyledTableRow key={category.id}>
                            <StyledTableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </StyledTable>
        </>
    );
};

export default Categories;
