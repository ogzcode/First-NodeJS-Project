"""user role

Revision ID: c4ca01df2e07
Revises: fc02ea2a45af
Create Date: 2024-03-12 17:00:14.973538

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c4ca01df2e07'
down_revision: Union[str, None] = 'fc02ea2a45af'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
