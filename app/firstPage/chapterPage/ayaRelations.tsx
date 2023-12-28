import React, { useEffect, useState } from "react";
import type { AyaSubmenuType, IRelation, RelationType } from "../../models";

import Relation from "./ayaRelation";
type IRelationOmit = Omit<IRelation, "date" | "userHash">;

const Relations = (props: {
    chapterId: number;
    ayaId: number;
    submenu: AyaSubmenuType;
}) => {
    const [relations, setRelations] = useState<IRelationOmit[]>([]);
    const [submenu, setSubmenu] = useState<AyaSubmenuType>("");

    if (props.submenu !== submenu) {
        setSubmenu(props.submenu);
    }

    useEffect(() => {
        fetch(
            `/api/relation?chapterId=${props.chapterId}&ayaId=${props.ayaId}&type=${props.submenu}`
        )
            .then((resp) => resp.json())
            .then((rel) => {
                if (rel.status === 200) {
                    const data: IRelationOmit[] = rel.data;
                    data.sort((a, b) => b.like - a.like);
                    setRelations(data);
                } else {
                    setRelations([]);
                }
            })
            .catch((err) => {
                console.log("Error on getting data", err);
            });
    }, [submenu]);

    return (
        <div className="pt-2">
            {relations.map((item: IRelationOmit) => (
                <Relation
                    chapterId={props.chapterId}
                    ayaId={props.ayaId}
                    item={item}
                    key={`${item.relateToBook}${item.relateToChapter}${item.relateToNumber}`}
                    type={submenu}
                />
            ))}
            <Relation
                chapterId={props.chapterId}
                ayaId={props.ayaId}
                item={{
                    chapterId: props.chapterId,
                    ayaId: props.ayaId,
                    relateToBook: "",
                    relateToChapter: 0,
                    relateToNumber: 0,
                    type: props.submenu as RelationType,
                    like: 0,
                }}
                key={`${new Date().getSeconds()}`}
                type={submenu}
            />
        </div>
    );
};

export default Relations;
